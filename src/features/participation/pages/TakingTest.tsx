import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import ConfirmedDialog from "@/shared/components/ConfirmedDialog";
import StudentFillInBlankQuestionCard from "@/shared/components/StudentFillInBlankQuestionCard";
import StudentMultipleChoiceQuestionCard from "@/shared/components/StudentMultipleChoiceQuestionCard";
import ErrorPage from "@/shared/pages/ErrorPage";
import FraudWarningDialog from "../components/FraudWarningDialog";
import TestHeader from "../components/TestHeader";
import {
	AUTO_SUBMIT_COUNTDOWN_MS,
	threshold,
	thresholdMessages,
} from "../constants";
import useFraudDetection from "../hooks/useFraudDetection";
import { useSubmitTest } from "../hooks/useSubmitTest";
import useTakingTest from "../hooks/useTakingTest";
import type { TestQuestion } from "../types/TakingTest";

const TakingTest = () => {
	const { testId } = useParams<{ testId: string }>();
	const navigate = useNavigate();
	const [fraudWarningOpen, setFraudWarningOpen] = useState(false);
	const [fraudWarningMessage, setFraudWarningMessage] = useState("");

	const {
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
		accumulatedQuestions,
		testAndQuestionsError,
	} = useTakingTest(testId ?? "");

	const { mutateAsync: submitTest, isPending: isSubmittingTest } =
		useSubmitTest();

	const showFraudWarning = useCallback((message: string) => {
		setFraudWarningMessage(message);
		setFraudWarningOpen(true);
	}, []);

	const handleSubmitRef = useRef<() => Promise<void>>(async () => {});
	const autoSubmitTimeoutRef = useRef<ReturnType<
		typeof window.setTimeout
	> | null>(null);

	const clearAutoSubmitTimeout = useCallback(() => {
		if (autoSubmitTimeoutRef.current !== null) {
			window.clearTimeout(autoSubmitTimeoutRef.current);
			autoSubmitTimeoutRef.current = null;
		}
	}, []);

	useEffect(() => {
		return () => {
			clearAutoSubmitTimeout();
		};
	}, [clearAutoSubmitTimeout]);

	const { reset } = useFraudDetection({
		threshold: threshold,
		testId: testData?.data.id,
		containerRef,
		onViolation: (v, _containerRef, currentCount) => {
			const msg = v.message || "Phát hiện hành vi gian lận";
			showFraudWarning(`${msg} Tổng vi phạm: ${currentCount} lần.`);
		},
		onThresholdReached: async () => {
			showFraudWarning(thresholdMessages[threshold]);
			clearAutoSubmitTimeout();
			autoSubmitTimeoutRef.current = window.setTimeout(() => {
				handleSubmitRef.current().catch(() => {});
			}, AUTO_SUBMIT_COUNTDOWN_MS);
		},
	});

	const handleSubmit = async () => {
		clearAutoSubmitTimeout();

		if (!testData) {
			return;
		}

		const payload = {
			testId: testData.data.id,
			answers: Object.entries(answers)
				.filter(([, v]) => v !== undefined && v !== null && v !== "")
				.map(([questionId, value]) => {
					const q = accumulatedQuestions.get(questionId);
					if (q?.type === "fill_in_the_blank") {
						return { questionId, answer: value };
					}
					return { questionId, optionId: value };
				}),
		};

		try {
			const testRes = await submitTest(payload);
			toast.success(testRes.message);
			reset();
			navigate(`/my-tests/${testData.data.id}/result`, {
				state: { testResult: testRes.data },
				replace: true,
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Nộp bài thất bại";
			toast.error(msg);
		}
	};

	useEffect(() => {
		handleSubmitRef.current = handleSubmit;
	}, [handleSubmit]);

	if (testAndQuestionsError) {
		return <ErrorPage error={testAndQuestionsError} />;
	}

	return (
		<div
			ref={containerRef}
			className="min-h-screen w-full bg-background overflow-y-auto"
		>
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
						label: "Quay lại",
						action: handleDismissFullscreen,
						variant: "outline",
					}}
					showCloseButton={false}
					preventOutsideClose={true}
				/>
			</Dialog>
			<FraudWarningDialog
				open={fraudWarningOpen}
				onOpenChange={setFraudWarningOpen}
				message={fraudWarningMessage}
				container={containerRef.current}
			/>
			<div className="mx-auto w-full">
				{isLoadingTest && <Skeleton className="h-24 w-full" />}
				{testData && (
					<TestHeader
						testName={testData.data.testName}
						answeredCount={answeredCount}
						totalQuestions={totalQuestions}
						timeLeft={timeLeft}
						formatTime={formatTime}
						progress={progress}
						onSubmit={handleSubmit}
						isSubmitting={isSubmittingTest}
						submitDialogContainer={containerRef}
					/>
				)}

				<div className="w-full flex flex-col items-center justify-center">
					{isLoadingQuestions ? (
						<div className="space-y-4 p-6 w-full max-w-5xl">
							{Array.from({ length: 3 }).map((_, i) => (
								// biome-ignore lint:suspicious/noArrayIndexKey
								<Skeleton key={i} className="h-40 w-full rounded-2xl" />
							))}
						</div>
					) : (
						<>
							<div className="max-w-5xl space-y-6 p-6 md:p-8">
								{questions.map((q: TestQuestion, i: number) => {
									const index = (page - 1) * 10 + i + 1;
									const points = Number((10 / totalQuestions).toFixed(2));

									if (q.type === "fill_in_the_blank") {
										return (
											<StudentFillInBlankQuestionCard
												key={q.id}
												index={index}
												points={points}
												question={q.question}
												topic={"Topic placeholder"}
												answer={answers[q.id] ?? ""}
												onAnswerChange={(value) => setAnswer(q.id, value)}
											/>
										);
									}

									return (
										<StudentMultipleChoiceQuestionCard
											key={q.id}
											index={index}
											points={points}
											question={q.question}
											topic={"Topic placeholder"}
											options={q.choices.map((c) => ({
												id: c.id,
												content: c.answer,
											}))}
											selectedOptionId={answers[q.id]}
											onSelectOption={(optionId) => setAnswer(q.id, optionId)}
										/>
									);
								})}
							</div>
							<div className="flex items-center justify-between pt-2 w-full max-w-3xl px-6 md:px-8 mb-8">
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
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default TakingTest;
