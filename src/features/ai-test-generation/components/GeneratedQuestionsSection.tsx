import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ConfirmedDialog from "@/shared/components/ConfirmedDialog";
import FillInBlankQuestionCard from "@/shared/components/FillInBlankQuestionCard";
import MultipleChoiceQuestionCard from "@/shared/components/MultipleChoiceQuestionCard";
import type { QuestionType } from "@/shared/constants/questionOption";
import type { TestInformationValues } from "@/shared/interfaces/TestInformation";
import type {
	GeneratedQuestionUI,
	OptionItem,
} from "../utils/mapGeneratedQuestionToUI";

interface GeneratedQuestionsSectionProps {
	questions: GeneratedQuestionUI[];
	onUpdateQuestion: (
		id: string,
		updater: (current: GeneratedQuestionUI) => GeneratedQuestionUI,
	) => void;
	onDeleteQuestion: (id: string) => void;
	onAddManualQuestion: () => void;
	onQuestionRef: (id: string, element: HTMLDivElement | null) => void;
	draftSnapshot: {
		prompt: string;
		subject: string;
		questions: GeneratedQuestionUI[];
		testInformation: TestInformationValues;
	} | null;
	isPending: boolean;
	handleRollbackToDraft: () => void;
}

const updateQuestionOptions = (
	current: GeneratedQuestionUI,
	optionId: string,
	value: string,
) => ({
	...current,
	options: current.options.map((option) =>
		option.id === optionId ? { ...option, value } : option,
	) as [OptionItem, OptionItem, OptionItem, OptionItem],
});

const renderQuestionCard = (
	question: GeneratedQuestionUI,
	index: number,
	onUpdateQuestion: GeneratedQuestionsSectionProps["onUpdateQuestion"],
	onDeleteQuestion: GeneratedQuestionsSectionProps["onDeleteQuestion"],
) => {
	const commonProps = {
		index: index + 1,
		question: question.question,
		difficulty: question.difficulty,
		questionType: question.questionType,
		onQuestionChange: (value: string) =>
			onUpdateQuestion(question.id, (current) => ({
				...current,
				question: value,
			})),
		onDifficultyChange: (value: GeneratedQuestionUI["difficulty"]) =>
			onUpdateQuestion(question.id, (current) => ({
				...current,
				difficulty: value,
			})),
		onQuestionTypeChange: (value: QuestionType) =>
			onUpdateQuestion(question.id, (current) => ({
				...current,
				questionType: value,
			})),
		onDelete: () => onDeleteQuestion(question.id),
	};

	if (question.questionType === "Điền từ") {
		return (
			<FillInBlankQuestionCard
				{...commonProps}
				correctAnswer={question.correctAnswer}
				onCorrectAnswerChange={(value) =>
					onUpdateQuestion(question.id, (current) => ({
						...current,
						correctAnswer: value,
					}))
				}
			/>
		);
	}

	return (
		<MultipleChoiceQuestionCard
			{...commonProps}
			options={question.options}
			questionType={question.questionType}
			correctOptionIndex={question.correctOptionIndex}
			onCorrectOptionChange={(value) =>
				onUpdateQuestion(question.id, (current) => ({
					...current,
					correctOptionIndex: value,
				}))
			}
			onOptionChange={(optionId, value) =>
				onUpdateQuestion(question.id, (current) =>
					updateQuestionOptions(current, optionId, value),
				)
			}
		/>
	);
};

export default function GeneratedQuestionsSection({
	questions,
	onUpdateQuestion,
	onDeleteQuestion,
	onAddManualQuestion,
	onQuestionRef,
	draftSnapshot,
	isPending,
	handleRollbackToDraft,
}: GeneratedQuestionsSectionProps) {
	if (questions.length === 0) {
		return null;
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold text-foreground">Kết quả tạo đề</h2>
				{draftSnapshot && !isPending && (
					<div className="flex items-center justify-end">
						<Dialog>
							<DialogTrigger asChild>
								<Button
									type="button"
									variant="outline"
									className="cursor-pointer"
								>
									Khôi phục bản nháp cũ
								</Button>
							</DialogTrigger>
							<ConfirmedDialog
								title="Khôi phục bản nháp cũ"
								description="Bạn có chắc muốn khôi phục bản nháp trước đó? Bộ câu hỏi hiện tại sẽ bị thay thế."
								action={handleRollbackToDraft}
								actionLabel="Khôi phục"
								actionVariant="default"
								secondaryAction={{
									label: "Hủy",
									action: () => {},
									variant: "outline",
								}}
							/>
						</Dialog>
					</div>
				)}
			</div>
			{questions.map((question, index) => (
				<div
					key={question.id}
					ref={(element) => onQuestionRef(question.id, element)}
				>
					{renderQuestionCard(
						question,
						index,
						onUpdateQuestion,
						onDeleteQuestion,
					)}
				</div>
			))}
			{!isPending && (
				<Button
					type="button"
					variant="outline"
					onClick={onAddManualQuestion}
					className="w-full border-dashed cursor-pointer"
				>
					+ Thêm câu hỏi thủ công
				</Button>
			)}
		</div>
	);
}
