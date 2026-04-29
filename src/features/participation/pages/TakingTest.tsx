import { Maximize, Minimize } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import ConfirmedDialog from "@/shared/components/ConfirmedDialog";
import StudentFillInBlankQuestionCard from "@/shared/components/StudentFillInBlankQuestionCard";
import StudentMultipleChoiceQuestionCard from "@/shared/components/StudentMultipleChoiceQuestionCard";
import useExamInfoQuery from "../hooks/useExamInfoQuery";
import useExamQuestionsQuery from "../hooks/useExamQuestionsQuery";
import type { ExamQuestion } from "../types/TakingTest";

const TakingTest = () => {
	const { testId } = useParams<{ testId: string }>();

	const [page, setPage] = useState(1);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// ===== Queries =====
	const { data: examData, isLoading: isLoadingExam } = useExamInfoQuery(
		testId ?? "",
	);

	const { data: questionsData, isLoading: isLoadingQuestions } =
		useExamQuestionsQuery(testId ?? "", page);

	const questions = questionsData?.data ?? [];
	const totalPages = questionsData?.metadata.totalPages ?? 1;
	const totalQuestions = examData?.metadata.totalQuestions ?? 0;

	// ===== Answer Stats =====
	const answeredCount = useMemo(() => {
		return Object.values(answers).filter((v) => v && v !== "").length;
	}, [answers]);

	const progress =
		totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

	// ===== Fullscreen =====
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

	useEffect(() => {
		if (examData?.data && !document.fullscreenElement) {
			containerRef.current?.requestFullscreen().catch(() => {});
		}
	}, [examData?.data]);

	// ===== Timer Init =====
	useEffect(() => {
		if (!examData?.data) {
			return;
		}

		const { startedTime, duration } = examData.data;
		const endTime = new Date(startedTime).getTime() + duration * 60 * 1000;
		const remaining = Math.floor((endTime - Date.now()) / 1000);
		setTimeLeft(remaining > 0 ? remaining : 0);
	}, [examData?.data]);

	// ===== Countdown =====
	useEffect(() => {
		if (timeLeft === null) {
			return;
		}

		if (timeLeft <= 0) {
			toast.info("Hết thời gian làm bài!");
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

	// ===== Submit =====
	const handleSubmit = () => {};

	return (
		<div ref={containerRef} className="h-screen w-full bg-background">
			<div className="mx-auto w-full">
				{/* ===== HEADER ===== */}
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

						{/* Progress Bar */}
						<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
							<div
								className="h-full bg-primary transition-all"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				) : null}

				<div className="w-full flex flex-col items-center justify-center ">
					{/* ===== QUESTIONS ===== */}
					{isLoadingQuestions ? (
						<div className="space-y-4">
							{Array.from({ length: 3 }).map((_, i) => (
								// biome-ignore lint:suspicious/noArrayIndexKey
								<Skeleton key={i} className="h-40 w-full rounded-2xl" />
							))}
						</div>
					) : (
						<div className="max-w-5xl space-y-6 p-6 md:p-8">
							{questions.map((q: ExamQuestion, i: number) => {
								const index = (page - 1) * 10 + i + 1;
								if (q.type === "FILL_IN_THE_BLANK") {
									return (
										<StudentFillInBlankQuestionCard
											key={q.id}
											index={index}
											question={q.question}
											topic={q.level}
											answer={answers[q.id] ?? ""}
											onAnswerChange={(value) =>
												setAnswers((prev) => ({
													...prev,
													[q.id]: value,
												}))
											}
										/>
									);
								}

								return (
									<StudentMultipleChoiceQuestionCard
										key={q.id}
										index={index}
										question={q.question}
										topic={q.level}
										options={q.choices.map((c) => ({
											id: c.id,
											content: c.answer,
										}))}
										selectedOptionId={answers[q.id]}
										onSelectOption={(optionId) =>
											setAnswers((prev) => ({
												...prev,
												[q.id]: optionId,
											}))
										}
									/>
								);
							})}
						</div>
					)}

					{/* ===== PAGINATION ===== */}
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
		</div>
	);
};

export default TakingTest;
