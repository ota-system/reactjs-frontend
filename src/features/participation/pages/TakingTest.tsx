import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import ConfirmedDialog from "@/shared/components/ConfirmedDialog";
import StudentFillInBlankQuestionCard from "@/shared/components/StudentFillInBlankQuestionCard";
import StudentMultipleChoiceQuestionCard from "@/shared/components/StudentMultipleChoiceQuestionCard";
import TestErrorState from "../components/TestErrorState";
import TestHeader from "../components/TestHeader";
import { useSubmitTest } from "../hooks/useSubmitTest";
import useTakingTest from "../hooks/useTakingTest";
import type { TestQuestion } from "../types/TakingTest";

const TakingTest = () => {
	const { testId } = useParams<{ testId: string }>();
	const navigate = useNavigate();

	const {
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
		testData,
		isLoadingTest,
		questions,
		totalPages,
		totalQuestions,
		isLoadingQuestions,
		answeredCount,
		progress,
		errorMessage,
		accumulatedQuestions,
	} = useTakingTest(testId ?? "");

	const { mutateAsync: submitTest } = useSubmitTest();

	const handleSubmit = async () => {
		if (!testData?.data) {
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
			navigate(`/my-tests/${testData.data.id}/result`, {
				state: { testResult: testRes.data },
				replace: true,
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Nộp bài thất bại";
			toast.error(msg);
		}
	};

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
				<TestErrorState
					errorMessage={errorMessage}
					testName={testData?.data.testName}
					totalQuestions={totalQuestions}
					answeredCount={answeredCount}
					onBack={() => navigate("/")}
				/>
			) : (
				<div className="mx-auto w-full">
					{isLoadingTest ? (
						<Skeleton className="h-24 w-full" />
					) : testData ? (
						<TestHeader
							testName={testData.data.testName}
							answeredCount={answeredCount}
							totalQuestions={totalQuestions}
							timeLeft={timeLeft}
							formatTime={formatTime}
							progress={progress}
							isFullscreen={isFullscreen}
							onToggleFullscreen={
								isFullscreen ? exitFullscreen : enterFullscreen
							}
							onSubmit={handleSubmit}
						/>
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
						)}

						{!isLoadingQuestions && (
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
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default TakingTest;
