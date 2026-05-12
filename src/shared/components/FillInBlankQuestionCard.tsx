import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuestionCard, { type QuestionCardProps } from "./QuestionCard";

interface FillInBlankQuestionCardProps extends QuestionCardProps {
	correctAnswer: string;
	onCorrectAnswerChange: (value: string) => void;
}

export default function FillInBlankQuestionCard({
	index,
	question,
	difficulty,
	questionType = "Điền từ",
	correctAnswer,
	onQuestionChange,
	onDifficultyChange,
	onQuestionTypeChange,
	onCorrectAnswerChange,
	onDelete,
	disabled = false,
	className,
}: FillInBlankQuestionCardProps) {
	return (
		<QuestionCard
			index={index}
			question={question}
			difficulty={difficulty}
			questionType={questionType}
			onQuestionChange={onQuestionChange}
			onDifficultyChange={onDifficultyChange}
			onQuestionTypeChange={onQuestionTypeChange}
			onDelete={onDelete}
			disabled={disabled}
			className={className}
		>
			<div className="space-y-2">
				<Label className="text-base font-semibold">Đáp án đúng *</Label>
				<Input
					value={correctAnswer}
					onChange={(event) => onCorrectAnswerChange(event.target.value)}
					placeholder="Nhập đáp án đúng"
					disabled={disabled}
					data-question-field="fill-in-blank-answer"
				/>
				<p className="text-sm text-muted-[var(--primary-color)]">
					Học sinh sẽ nhập câu trả lời vào ô trống. Đáp án không phân biệt chữ
					hoa/thường.
				</p>
			</div>
		</QuestionCard>
	);
}

export type { FillInBlankQuestionCardProps };
