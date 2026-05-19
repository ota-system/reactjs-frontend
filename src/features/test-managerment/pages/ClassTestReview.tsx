import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import TestCreationHeader from "@/features/ai-test-generation/components/TestCreationHeader";
import type { GeneratedQuestionUI } from "@/features/ai-test-generation/utils/mapGeneratedQuestionToUI";
import TestQuestionEditDialog from "@/features/class/components/TestQuestionEditDialog";
import { toast } from "@/lib/toast";
import FillInBlankQuestionCard from "@/shared/components/FillInBlankQuestionCard";
import MultipleChoiceQuestionCard from "@/shared/components/MultipleChoiceQuestionCard";
import TestInformationPanel from "@/shared/components/TestInformationPanel";
import { QuestionTypeEnum } from "@/shared/constants/questionOption";
import type { TestInformationValues } from "@/shared/interfaces/TestInformation";
import { isMultipleChoiceUI } from "@/shared/utils/questionMapping";
import { useClassTestReviewQuery } from "../hooks/useClassTestReviewQuery";
import { useDeleteQuestionMutation } from "../hooks/useDeleteQuestionMutation";
import { useUpdateQuestionMutation } from "../hooks/useUpdateQuestionMutation";
import { useUpdateTestInfoMutation } from "../hooks/useUpdateTestInfoMutation";
import mapTestDetailToValues from "../utils/mapTestDetailToValues";

export default function ClassTestReview() {
	const noop = () => {};
	const { classId, testId } = useParams<{ classId: string; testId: string }>();
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useClassTestReviewQuery(testId);
	const updateQuestionMutation = useUpdateQuestionMutation();
	const updateTestInfoMutation = useUpdateTestInfoMutation();
	const [questions, setQuestions] = useState<GeneratedQuestionUI[]>([]);
	const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
		null,
	);
	const testDetail = data?.testDetail;
	const [testInfoValues, setTestInfoValues] = useState<TestInformationValues>(
		mapTestDetailToValues(testDetail),
	);
	const [testInfoDraftValues, setTestInfoDraftValues] =
		useState<TestInformationValues>(mapTestDetailToValues(testDetail));
	const [isTestInfoEditOpen, setIsTestInfoEditOpen] = useState(false);
	const [isSavingTestInfo, setIsSavingTestInfo] = useState(false);
	const notAllowEditTestInfo = Boolean(testDetail?.timesUp);
	const editingQuestion =
		questions.find((question) => question.id === editingQuestionId) ?? null;

	const { mutateAsync: deleteQuestion, isPending: isDeletingQuestion } =
		useDeleteQuestionMutation();

	useEffect(() => {
		if (data?.questions) {
			setQuestions(data.questions);
		}
	}, [data]);

	useEffect(() => {
		if (isDeletingQuestion) {
			toast.loading("Đang xóa câu hỏi...");
		} else {
			toast.dismiss();
		}
	}, [isDeletingQuestion]);

	useEffect(() => {
		setTestInfoValues(mapTestDetailToValues(testDetail));
		setTestInfoDraftValues(mapTestDetailToValues(testDetail));
	}, [testDetail]);

	const deleteQuestionById = async (questionId: string) => {
		try {
			if (!testId) {
				toast.error("Không tìm thấy bài thi.");
				return;
			}

			if (questions.length <= 1) {
				toast.error("Bài thi phải có ít nhất một câu hỏi.");
				return;
			}

			const result = await deleteQuestion({ testId, questionId });
			setQuestions((prev) =>
				prev.filter((question) => question.id !== questionId),
			);
			console.log(result);
			toast.success(result.message || "Đã xóa câu hỏi.");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Không xóa được câu hỏi",
			);
		}
	};

	const handleSaveQuestion = async (updatedQuestion: GeneratedQuestionUI) => {
		if (!testId) {
			throw new Error("Không tìm thấy bài thi.");
		}

		try {
			if (updatedQuestion.question.trim() === "") {
				throw new Error("Câu hỏi không được để trống.");
			} else if (isMultipleChoiceUI(updatedQuestion.questionType)) {
				console.log(
					"Validating multiple choice question:",
					updatedQuestion.options,
				);
				if (
					updatedQuestion.options.filter((opt) => opt.value.trim() !== "")
						.length < 2
				) {
					throw new Error("Cần có ít nhất 2 đáp án.");
				}
				if (
					updatedQuestion.options[
						updatedQuestion.correctOptionIndex
					].value.trim() === ""
				) {
					throw new Error("Vui lòng điền đáp án bạn đã chọn.");
				}
			} else if (
				updatedQuestion.questionType === QuestionTypeEnum.FILL_IN_BLANK &&
				updatedQuestion.correctAnswer.trim() === ""
			) {
				throw new Error("Đáp án đúng không được để trống.");
			}

			const result = await updateQuestionMutation.mutateAsync({
				testId,
				questionId: updatedQuestion.id,
				question: updatedQuestion,
			});
			setQuestions((prev) =>
				prev.map((question) =>
					question.id === updatedQuestion.id ? updatedQuestion : question,
				),
			);
			toast.success(result.message || "Đã cập nhật câu hỏi.");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Không cập nhật được câu hỏi.",
			);
			throw error;
		}
	};

	const renderQuestionCard = (question: GeneratedQuestionUI, index: number) => {
		const commonProps = {
			index: index + 1,
			question: question.question,
			difficulty: question.difficulty,
			questionType: question.questionType,
			disabled: true,
			onQuestionChange: noop,
			onDifficultyChange: noop,
			onQuestionTypeChange: noop,
			onEdit: () => setEditingQuestionId(question.id),
			onDelete: () => deleteQuestionById(question.id),
		};

		if (question.questionType === QuestionTypeEnum.FILL_IN_BLANK) {
			return (
				<FillInBlankQuestionCard
					{...commonProps}
					correctAnswer={question.correctAnswer}
					onCorrectAnswerChange={noop}
					className="bg-white"
					notAllowEdit={notAllowEditTestInfo}
				/>
			);
		}

		return (
			<MultipleChoiceQuestionCard
				{...commonProps}
				options={question.options}
				correctOptionIndex={question.correctOptionIndex}
				onCorrectOptionChange={noop}
				onOptionChange={noop}
				className="bg-white"
				notAllowEdit={notAllowEditTestInfo}
			/>
		);
	};

	const handleSaveTestInfo = async () => {
		try {
			if (!testId) {
				toast.error("Không tìm thấy bài thi.");
				return;
			}
			setIsSavingTestInfo(true);
			const result = await updateTestInfoMutation.mutateAsync({
				testId,
				testInformation: testInfoDraftValues,
			});
			setTestInfoValues(testInfoDraftValues);
			setIsTestInfoEditOpen(false);
			toast.success(result.message || "Đã cập nhật thông tin bài thi.");
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Không cập nhật được thông tin bài thi.",
			);
		} finally {
			setIsSavingTestInfo(false);
		}
	};

	const openTestInfoEditor = () => {
		if (notAllowEditTestInfo) {
			toast.info("Bài thi đã kết thúc, không thể chỉnh sửa thông tin.");
			return;
		}
		setTestInfoDraftValues(testInfoValues);
		setIsTestInfoEditOpen(true);
	};

	if (isLoading) {
		return (
			<div className="space-y-6 w-full self-start p-4 flex flex-col gap-6">
				<div className="space-y-4">
					<Skeleton className="h-14 w-full rounded-2xl" />
					<Skeleton className="h-32 w-full rounded-2xl" />
					<Skeleton className="h-32 w-full rounded-2xl" />
				</div>
				<div className="space-y-4">
					<Skeleton className="h-64 w-full rounded-2xl" />
					<Skeleton className="h-64 w-full rounded-2xl" />
				</div>
			</div>
		);
	}

	if (isError || !testDetail) {
		return (
			<Card className="rounded-2xl border">
				<CardContent className="p-6 text-center space-y-3">
					<div className="text-lg font-medium text-red-500">
						{error instanceof Error ? error.message : "Không tải được bài thi."}
					</div>
					<Button
						type="button"
						variant="outline"
						onClick={() => navigate(`/classes/${classId}/tests`)}
						className="cursor-pointer"
					>
						Quay lại danh sách bài thi
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-8 w-full self-start p-4 flex flex-col gap-6">
			<TestCreationHeader
				title={testDetail.testName}
				subtitle="Xem và chỉnh sửa câu hỏi của bài thi"
				onBack={() => navigate(`/classes/${classId}/tests`)}
			/>

			<TestInformationPanel
				values={testInfoValues}
				onFieldChange={(field, value) =>
					setTestInfoValues((prev) => ({ ...prev, [field]: value }))
				}
				onCancel={() => setTestInfoValues(mapTestDetailToValues(testDetail))}
				onSave={noop}
				isSaving={isSavingTestInfo || updateTestInfoMutation.isPending}
				showButtons={false}
				disableFields={true}
				showEditIcon={true}
				onEdit={openTestInfoEditor}
			/>

			<Dialog open={isTestInfoEditOpen} onOpenChange={setIsTestInfoEditOpen}>
				<DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Chỉnh sửa thông tin bài thi</DialogTitle>
						<DialogDescription>
							Cập nhật thông tin hiển thị của bài thi rồi lưu lại để áp dụng
							thay đổi.
						</DialogDescription>
					</DialogHeader>

					<TestInformationPanel
						values={testInfoDraftValues}
						onFieldChange={(field, value) =>
							setTestInfoDraftValues((prev) => ({ ...prev, [field]: value }))
						}
						onCancel={() => {
							setTestInfoDraftValues(testInfoValues);
							setIsTestInfoEditOpen(false);
						}}
						onSave={async () => {
							setIsSavingTestInfo(true);
							await handleSaveTestInfo();
						}}
						disableFields={false}
						isSaving={isSavingTestInfo || updateTestInfoMutation.isPending}
						isOnModal={true}
						showButtons={true}
					/>
				</DialogContent>
			</Dialog>

			<div className="space-y-4">
				<div className="flex items-center justify-start gap-4">
					<h2 className="text-2xl font-bold">Danh sách câu hỏi</h2>
				</div>

				{questions.length === 0 ? (
					<Card className="rounded-2xl border">
						<CardContent className="p-8 text-center text-muted-foreground">
							Bài thi chưa có câu hỏi nào.
						</CardContent>
					</Card>
				) : (
					<div className="space-y-4">
						{questions.map((question, index) => (
							<div key={question.id}>{renderQuestionCard(question, index)}</div>
						))}
					</div>
				)}
			</div>

			<TestQuestionEditDialog
				open={Boolean(editingQuestion)}
				question={editingQuestion}
				questionNumber={
					editingQuestion
						? questions.findIndex((item) => item.id === editingQuestion.id) + 1
						: 0
				}
				onOpenChange={(open) => {
					if (!open) {
						setEditingQuestionId(null);
					}
				}}
				onSave={handleSaveQuestion}
			/>
		</div>
	);
}
