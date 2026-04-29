import { Maximize, Minimize } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmedDialog from "@/shared/components/ConfirmedDialog";
import StudentFillInBlankQuestionCard from "@/shared/components/StudentFillInBlankQuestionCard";
import StudentMultipleChoiceQuestionCard from "@/shared/components/StudentMultipleChoiceQuestionCard";
import useExamInfoQuery from "../hooks/useExamInfoQuery";
import useExamQuestionsQuery from "../hooks/useExamQuestionsQuery";
import type { ExamQuestion } from "../types/TakingTest";

const TakingTest = () => {
	const { testId } = useParams<{ testId: string }>();
	const navigate = useNavigate();

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
	} = useExamInfoQuery(testId ?? "");

	const {
		data: questionsData,
		isLoading: isLoadingQuestions,
		isError: isQuestionsError,
		error: questionsError,
	} = useExamQuestionsQuery(testId ?? "", page);

	const questions = questionsData?.data ?? [];
	const totalPages = questionsData?.metadata.totalPages ?? 1;
	const totalQuestions = examData?.metadata.totalQuestions ?? 0;

	const answeredCount = useMemo(() => {
		return Object.values(answers).filter((v) => v && v !== "").length;
	}, [answers]);

	const progress =
		totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

	const enterFullscreen = () => {
		containerRef.current?.requestFullscreen();
	};

	const exitFullscreen = () => {
		document.exitFullscreen();
	};

	useEffect(() => {
		const onChange = () => setIsFullscreen(!!document.fullscreenElement);
		document.addEventListener("fullscreenchange", onChange);
		return () => document.removeEventListener("fullscreenchange", onChange);
	}, []);

	const handleEnterFullscreen = () => {
		setShowFullscreenPrompt(false);
		containerRef.current?.requestFullscreen().catch(() => {});
	};

	const handleDismissFullscreen = () => {
		setShowFullscreenPrompt(false);
	};

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
		if (timeLeft === null) {
			return;
		}

		if (timeLeft <= 0) {
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

	const handleSubmit = () => {};

	const getErrorMessage = (error: unknown) =>
		error instanceof Error ? error.message : "Đã xảy ra lỗi. Vui lòng thử lại.";

	const errorMessage = isExamError
		? getErrorMessage(examError)
		: isQuestionsError
			? getErrorMessage(questionsError)
			: timeLeft === 0
				? "Hết thời gian làm bài!"
				: null;

	return (
		<div ref={containerRef} className="min-h-screen w-full bg-background">
			<Dialog
				open={showFullscreenPrompt}
				onOpenChange={setShowFullscreenPrompt}
			>
				<ConfirmedDialog
					title="Yêu cầu toàn màn hình"
					description="Bài thi yêu cầu bạn làm bài ở chế độ toàn màn hình. Vui lòng bật toàn màn hình để tiếp tục."
					actionLabel="Bật toàn màn hình"
					actionVariant="default"
					action={handleEnterFullscreen}
					secondaryAction={{
						label: "Bỏ qua",
						action: handleDismissFullscreen,
						variant: "outline",
					}}
				/>
			</Dialog>

			{errorMessage ? (
				<div className="flex h-screen flex-col items-center justify-center gap-4">
					{examData && (
						<div className="rounded-2xl border bg-background p-6 shadow-sm space-y-1 text-center">
							<h1 className="text-xl font-bold text-[var(--primary-color)]">
								{examData.data.testName}
							</h1>
							<p className="text-sm text-muted-foreground">
								{totalQuestions} câu hỏi • Đã trả lời: {answeredCount}/
								{totalQuestions}
							</p>
						</div>
					)}
					<p className="text-lg font-medium text-destructive">{errorMessage}</p>
					<Button
						variant="outline"
						className="cursor-pointer"
						onClick={() => navigate("/")}
					>
						Về trang chủ
					</Button>
				</div>
			) : (
				<div className="mx-auto w-full">
					{isLoadingExam ? (
						<Skeleton className="h-24 w-full" />
					) : examData ? (
						<div className="sticky top-0 z-10 space-y-3 border bg-background p-5 shadow-sm">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={isFullscreen ? exitFullscreen : enterFullscreen}
										className="cursor-pointer"
										aria-label={
											isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"
										}
									>
										{isFullscreen ? (
											<Minimize className="size-4" />
										) : (
											<Maximize className="size-4" />
										)}
									</Button>
									<div>
										<h1 className="text-xl font-bold text-[var(--primary-color)]">
											{examData.data.testName}
										</h1>
										<p className="text-sm text-muted-foreground">
											Đã trả lời: {answeredCount}/{totalQuestions}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									{timeLeft !== null && (
										<div
											className={`rounded-lg border px-4 py-2 font-semibold tabular-nums ${
												timeLeft <= 60
													? "border-red-300 text-red-500"
													: "text-[var(--primary-color)]"
											}`}
										>
											{formatTime(timeLeft)}
										</div>
									)}

									<Dialog>
										<DialogTrigger asChild>
											<Button className="cursor-pointer">
												Nộp bài ({answeredCount}/{totalQuestions})
											</Button>
										</DialogTrigger>
										<ConfirmedDialog
											title="Nộp bài"
											description="Bạn có chắc muốn nộp bài? Hành động này không thể hoàn tác."
											actionLabel="Nộp bài"
											actionVariant="default"
											action={handleSubmit}
											secondaryAction={{
												label: "Hủy",
												action: () => {},
												variant: "outline",
											}}
										/>
									</Dialog>
								</div>
							</div>

							<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
								<div
									className="h-full bg-primary transition-all"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					) : null}

					<div className="w-full flex flex-col items-center justify-center">
						{isLoadingQuestions ? (
							<div className="space-y-4 p-6 w-full max-w-5xl">
								{Array.from({ length: 3 }).map((_, i) => (
									// biome-ignore lint:suspicious/noArrayIndexKey
									<Skeleton key={i} className="h-40 w-full rounded-2xl" />
								))}
							</div>
						) : (
							<div className="max-w-5xl space-y-6 p-6 md:p-8">
								{questions.map((q: ExamQuestion, i: number) => {
									const index = (page - 1) * 10 + i + 1;
									if (q.type === "fill_in_the_blank") {
										return (
											<StudentFillInBlankQuestionCard
												key={q.id}
												index={index}
												points={Number((10 / totalQuestions).toFixed(2))}
												question={q.question}
												topic={"Topic placeholder"}
												answer={answers[q.id] ?? ""}
												onAnswerChange={(value) =>
													setAnswers((prev) => ({ ...prev, [q.id]: value }))
												}
											/>
										);
									}

									return (
										<StudentMultipleChoiceQuestionCard
											key={q.id}
											points={Number((10 / totalQuestions).toFixed(2))}
											index={index}
											question={q.question}
											topic={"Topic placeholder"}
											options={q.choices.map((c) => ({
												id: c.id,
												content: c.answer,
											}))}
											selectedOptionId={answers[q.id]}
											onSelectOption={(optionId) =>
												setAnswers((prev) => ({ ...prev, [q.id]: optionId }))
											}
										/>
									);
								})}
							</div>
						)}

						{!isLoadingQuestions && (
							<div className="flex items-center justify-between pt-2 w-full max-w-3xl px-6 md:px-8">
								<Button
									variant="outline"
									disabled={page <= 1}
									onClick={() => setPage((p) => p - 1)}
									className="cursor-pointer"
								>
									Trang trước
								</Button>

								<span className="text-sm text-muted-foreground">
									Trang {page} / {totalPages}
								</span>

								<Button
									disabled={page >= totalPages}
									onClick={() => setPage((p) => p + 1)}
									className="cursor-pointer"
								>
									Trang tiếp
								</Button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default TakingTest;
