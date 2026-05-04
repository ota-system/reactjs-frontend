import { useEffect, useMemo, useRef, useState } from "react";
import useTestInfoQuery from "./useTestInfoQuery";
import useTestQuestionsQuery from "./useTestQuestionsQuery";

const getErrorMessage = (error: unknown) =>
	error instanceof Error ? error.message : "Đã xảy ra lỗi. Vui lòng thử lại.";

const useTakingTest = (testId: string) => {
	const [page, setPage] = useState(1);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);

	const {
		data: examData,
		isLoading: isLoadingExam,
		isError: isExamError,
		error: examError,
	} = useTestInfoQuery(testId);

	const {
		data: questionsData,
		isLoading: isLoadingQuestions,
		isError: isQuestionsError,
		error: questionsError,
	} = useTestQuestionsQuery(testId, page);

	const questions = questionsData?.data ?? [];
	const totalPages = questionsData?.metadata.totalPages ?? 1;
	const totalQuestions = examData?.data.totalQuestions ?? 0;

	const answeredCount = useMemo(
		() => Object.values(answers).filter((v) => v && v !== "").length,
		[answers],
	);

	const progress =
		totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

	const enterFullscreen = () => containerRef.current?.requestFullscreen();
	const exitFullscreen = () => document.exitFullscreen();

	useEffect(() => {
		const onChange = () => setIsFullscreen(!!document.fullscreenElement);
		document.addEventListener("fullscreenchange", onChange);
		return () => document.removeEventListener("fullscreenchange", onChange);
	}, []);

	const handleEnterFullscreen = () => {
		setShowFullscreenPrompt(false);
		containerRef.current?.requestFullscreen().catch(() => {});
	};

	const handleDismissFullscreen = () => setShowFullscreenPrompt(false);

	// ===== Timer =====
	useEffect(() => {
		if (!examData?.data) {
			return;
		}
		const { startedTime, duration } = examData.data;
		const endTime = new Date(startedTime).getTime() + duration * 60 * 1000;
		const remaining = Math.floor((endTime - Date.now()) / 1000);
		setTimeLeft(remaining > 0 ? remaining : 0);
	}, [examData?.data]);

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
		setAnswers((prev) => ({ ...prev, [id]: value }));

	// ===== Error =====
	const errorMessage = isExamError
		? getErrorMessage(examError)
		: isQuestionsError
			? getErrorMessage(questionsError)
			: timeLeft === 0
				? "Hết thời gian làm bài!"
				: null;

	return {
		containerRef,
		page,
		setPage,
		answers,
		setAnswer,
		timeLeft,
		isFullscreen,
		enterFullscreen,
		exitFullscreen,
		showFullscreenPrompt,
		setShowFullscreenPrompt,
		handleEnterFullscreen,
		handleDismissFullscreen,
		formatTime,
		examData,
		isLoadingExam,
		questions,
		totalPages,
		totalQuestions,
		isLoadingQuestions,
		answeredCount,
		progress,
		errorMessage,
	};
};

export default useTakingTest;
