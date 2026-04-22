import FillInBlankQuestionCard from "@/shared/components/FillInBlankQuestionCard";
import MultipleChoiceQuestionCard from "@/shared/components/MultipleChoiceQuestionCard";
import type { QuestionType } from "@/shared/constants/questionOption";
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
	onQuestionRef: (id: string, element: HTMLDivElement | null) => void;
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
	onQuestionRef,
}: GeneratedQuestionsSectionProps) {
	if (questions.length === 0) {
		return null;
	}

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold text-foreground">Kết quả tạo đề</h2>
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
		</div>
	);
}
