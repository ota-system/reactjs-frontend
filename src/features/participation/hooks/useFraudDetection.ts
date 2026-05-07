import { useCallback, useEffect, useRef } from "react";
import { fraudTypes } from "../constants/fraudType";
import { useSaveFraudReport } from "./useSaveFraudReport";

export type Violation = {
	fraudType: string;
	message?: string;
};

type TrackedViolation = Violation & {
	id: string;
};

type Options = {
	threshold?: number;
	testId?: string;
	containerRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
	onViolation?: (
		v: Violation,
		containerRef?: React.RefObject<HTMLElement | HTMLDivElement | null>,
		currentCount?: number,
	) => void;
	onThresholdReached?: (
		violations: Violation[],
		containerRef?: React.RefObject<HTMLElement | HTMLDivElement | null>,
	) => void;
	debug?: boolean;
};

const VISIBILITY_DEDUP_WINDOW_MS = 1200;

const stripViolationId = ({
	id: _id,
	...violation
}: TrackedViolation): Violation => violation;

export default function useFraudDetection(options: Options = {}) {
	const {
		threshold = 10,
		testId,
		containerRef,
		onViolation,
		onThresholdReached,
	} = options;

	const saveReport = useSaveFraudReport();
	const mutateAsyncRef = useRef(saveReport.mutateAsync);
	mutateAsyncRef.current = saveReport.mutateAsync;

	const violationsRef = useRef<TrackedViolation[]>([]);
	const isLockedRef = useRef(false);
	const hiddenSessionRef = useRef(false);
	const lastVisibilityViolationAtRef = useRef(0);
	const violationCounterRef = useRef(0);
	const testIdRef = useRef(testId);
	const thresholdRef = useRef(threshold);
	const containerRefRef = useRef(containerRef);
	const onViolationRef = useRef(onViolation);
	const onThresholdReachedRef = useRef(onThresholdReached);

	testIdRef.current = testId;
	thresholdRef.current = threshold;
	containerRefRef.current = containerRef;
	onViolationRef.current = onViolation;
	onThresholdReachedRef.current = onThresholdReached;

	const sendReport = useCallback(async (v: TrackedViolation) => {
		if (!testIdRef.current) {
			return;
		}
		const result = await mutateAsyncRef.current({
			testId: testIdRef.current,
			fraudType: v.fraudType,
		});
		return result;
	}, []);

	const createViolation = useCallback((fraudType: string): TrackedViolation => {
		violationCounterRef.current += 1;
		return {
			id: `${Date.now()}-${violationCounterRef.current}`,
			fraudType,
		};
	}, []);

	const canRegisterVisibilityViolation = useCallback(() => {
		const now = Date.now();
		if (
			now - lastVisibilityViolationAtRef.current <
			VISIBILITY_DEDUP_WINDOW_MS
		) {
			return false;
		}

		lastVisibilityViolationAtRef.current = now;
		return true;
	}, []);

	const registerViolation = useCallback(
		(fraudType: string) => {
			if (isLockedRef.current) {
				return;
			}
			if (!testIdRef.current) {
				return;
			}

			const violation = createViolation(fraudType);
			violationsRef.current.push(violation);
			const nextCount = violationsRef.current.length;
			const reachedThreshold = nextCount >= thresholdRef.current;

			if (reachedThreshold && !isLockedRef.current) {
				isLockedRef.current = true;
				onThresholdReachedRef.current?.(
					violationsRef.current.map(stripViolationId),
					containerRefRef.current,
				);
			}

			void sendReport(violation)
				.then((result) => {
					const reportResult = result as { message?: string } | undefined;
					if (typeof reportResult?.message === "string") {
						const violationIndex = violationsRef.current.findIndex(
							(item) => item.id === violation.id,
						);
						if (violationIndex >= 0) {
							violationsRef.current[violationIndex] = {
								...violationsRef.current[violationIndex],
								message: reportResult.message,
							};
						}
					}

					const trackedViolation = violationsRef.current.find(
						(item) => item.id === violation.id,
					);
					if (!reachedThreshold && !isLockedRef.current && trackedViolation) {
						onViolationRef.current?.(
							stripViolationId(trackedViolation),
							containerRefRef.current,
							violationsRef.current.length,
						);
					}
				})
				.catch((_err) => {
					const trackedViolation = violationsRef.current.find(
						(item) => item.id === violation.id,
					);
					if (!reachedThreshold && !isLockedRef.current && trackedViolation) {
						onViolationRef.current?.(
							stripViolationId(trackedViolation),
							containerRefRef.current,
							violationsRef.current.length,
						);
					}
				});
		},
		[createViolation, sendReport],
	);

	useEffect(() => {
		const handleVisibility = () => {
			if (document.visibilityState === "hidden") {
				if (hiddenSessionRef.current || !canRegisterVisibilityViolation()) {
					return;
				}
				hiddenSessionRef.current = true;
				registerViolation(fraudTypes.VISIBILITY_CHANGE);
			} else {
				hiddenSessionRef.current = false;
			}
		};

		const handleWindowBlur = () => {
			if (document.visibilityState !== "visible") {
				return;
			}
			if (hiddenSessionRef.current || !canRegisterVisibilityViolation()) {
				return;
			}
			hiddenSessionRef.current = true;
			registerViolation(fraudTypes.VISIBILITY_CHANGE);
		};

		const handleWindowFocus = () => {
			if (document.visibilityState !== "visible") {
				return;
			}
			hiddenSessionRef.current = false;
		};

		const handleFullscreenChange = () => {
			if (!document.fullscreenElement) {
				registerViolation(fraudTypes.FULLSCREEN_EXIT);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.repeat) {
				return;
			}
			if (document.visibilityState === "hidden") {
				return;
			}

			const isSuspiciousShortcut =
				(e.shiftKey && e.key === "F10") ||
				(e.ctrlKey && e.key === "Escape") ||
				(e.shiftKey && e.key === "Escape") ||
				(e.ctrlKey && e.key === "F4");

			if (!isSuspiciousShortcut) {
				return;
			}

			setTimeout(() => {
				if (hiddenSessionRef.current || !canRegisterVisibilityViolation()) {
					return;
				}
				registerViolation(fraudTypes.VISIBILITY_CHANGE);
			}, 50);
		};

		document.addEventListener("visibilitychange", handleVisibility);
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		document.addEventListener("keydown", handleKeyDown, true);
		window.addEventListener("blur", handleWindowBlur);
		window.addEventListener("focus", handleWindowFocus);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibility);
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
			document.removeEventListener("keydown", handleKeyDown, true);
			window.removeEventListener("blur", handleWindowBlur);
			window.removeEventListener("focus", handleWindowFocus);
		};
	}, [registerViolation, canRegisterVisibilityViolation]);

	const reset = useCallback(() => {
		violationsRef.current = [];
		isLockedRef.current = false;
		hiddenSessionRef.current = false;
		lastVisibilityViolationAtRef.current = 0;
		violationCounterRef.current = 0;
	}, []);

	return {
		reset,
	};
}
