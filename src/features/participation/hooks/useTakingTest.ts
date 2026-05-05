import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { HttpError } from "@/shared/type";
import type { TestQuestion } from "../types/TakingTest";
import useTestInfoQuery from "./useTestInfoQuery";
import useTestQuestionsQuery from "./useTestQuestionsQuery";

const useTakingTest = (testId: string) => {
	const [page, setPage] = useState(1);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const accumulatedQuestionsRef = useRef<Map<string, TestQuestion>>(new Map());
	const navigate = useNavigate();

	const STORAGE_KEY = `taking-test-answers-${testId}`;

	useEffect(() => {
		if (!testId) {
			return;
		}
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				setAnswers(JSON.parse(raw));
			}
		} catch (error) {
			console.warn("Failed to load saved answers from localStorage", error);
		}
	}, [STORAGE_KEY, testId]);
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const [testAndQuestionsError, setTestAndQuestionsError] =
		useState<HttpError | null>(null);

	const {
		data: testData,
		isLoading: isLoadingTest,
		isError: isTestError,
		error: testError,
		isSuccess: isTestSuccess,
	} = useTestInfoQuery(testId);

	const {
		data: questionsData,
		isLoading: isLoadingQuestions,
		isError: isQuestionsError,
		error: questionsError,
	} = useTestQuestionsQuery(testId, page);

	const questions = questionsData?.data?.questions ?? [];
	const totalPages = questionsData?.metadata.totalPages ?? 1;
	const totalQuestions = questionsData?.data?.totalQuestions ?? 0;

	useEffect(() => {
		if (questions && questions.length > 0) {
			questions.forEach((q: TestQuestion) => {
				accumulatedQuestionsRef.current.set(q.id, q);
			});
		}
	}, [questions]);

	useEffect(() => {
		if (isTestSuccess && !isFullscreen) {
			setShowFullscreenPrompt(true);
		}
	}, [isTestSuccess, isFullscreen]);

	const answeredCount = useMemo(
		() => Object.values(answers).filter((v) => v && v !== "").length,
		[answers],
	);

	const progress =
		totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

	useEffect(() => {
		const onChange = () => setIsFullscreen(!!document.fullscreenElement);
		document.addEventListener("fullscreenchange", onChange);
		return () => document.removeEventListener("fullscreenchange", onChange);
	}, []);

	const handleEnterFullscreen = () => {
		setShowFullscreenPrompt(false);
		containerRef.current?.requestFullscreen().catch(() => {});
	};

	const handleDismissFullscreen = () => navigate(-1);

	// ===== Timer =====
	useEffect(() => {
		if (!testData?.data) {
			return;
		}
		const { startedTime, duration } = testData.data;
		const endTime = new Date(startedTime).getTime() + duration * 60 * 1000;
		const remaining = Math.floor((endTime - Date.now()) / 1000);
		setTimeLeft(remaining > 0 ? remaining : 0);
	}, [testData?.data]);

	useEffect(() => {
		if (timeLeft === null || timeLeft <= 0) {
			return;
		}
		const timer = setTimeout(() => setTimeLeft((t) => (t ?? 1) - 1), 1000);
		return () => clearTimeout(timer);
	}, [timeLeft]);

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	// ===== Answers =====
	const setAnswer = (id: string, value: string) =>
		setAnswers((prev) => {
			const next = { ...prev, [id]: value };
			try {
				if (testId) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
				}
			} catch (error) {
				console.warn("Failed to save answers to localStorage", error);
			}
			return next;
		});

	// ===== Error =====
	useEffect(() => {
		if (isTestError) {
			setTestAndQuestionsError(testError);
		} else if (isQuestionsError) {
			setTestAndQuestionsError(questionsError);
		} else if (timeLeft === 0) {
			setTestAndQuestionsError({
				status: 408,
				message: "Hết thời gian làm bài!",
				code: "REQUEST_TIMEOUT",
				path: window.location.pathname,
				details: [],
				timestamp: new Date().toISOString(),
			});
		} else {
			setTestAndQuestionsError(null);
		}
	}, [isTestError, isQuestionsError, testError, questionsError, timeLeft]);

	return {
		containerRef,
		page,
		setPage,
		answers,
		setAnswer,
		timeLeft,
		showFullscreenPrompt,
		setShowFullscreenPrompt,
		handleEnterFullscreen,
		handleDismissFullscreen,
		formatTime,
		testData,
		isLoadingTest,
		questions,
		totalPages,
		totalQuestions,
		isLoadingQuestions,
		answeredCount,
		progress,
		accumulatedQuestions: accumulatedQuestionsRef.current,
		testAndQuestionsError,
	};
};

export default useTakingTest;
