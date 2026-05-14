import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionTypeEnum } from "../constants/questionOption";
import QuestionCard, { type QuestionCardProps } from "./QuestionCard";

interface MultipleChoiceQuestionCardProps extends QuestionCardProps {
	options: [
		{ id: string; value: string },
		{ id: string; value: string },
		{ id: string; value: string },
		{ id: string; value: string },
	];
	onOptionChange: (id: string, value: string) => void;
	correctOptionIndex?: number;
	onCorrectOptionChange?: (optionIndex: number) => void;
}

export default function MultipleChoiceQuestionCard({
	index,
	question,
	difficulty,
	questionType = QuestionTypeEnum.MULTIPLE_CHOICE,
	options,
	onQuestionChange,
	onDifficultyChange,
	onQuestionTypeChange,
	onEdit,
	onOptionChange,
	correctOptionIndex,
	onCorrectOptionChange,
	onDelete,
	disabled = false,
	className,
}: MultipleChoiceQuestionCardProps) {
	return (
		<QuestionCard
			index={index}
			question={question}
			difficulty={difficulty}
			questionType={questionType}
			onQuestionChange={onQuestionChange}
			onDifficultyChange={onDifficultyChange}
			onQuestionTypeChange={onQuestionTypeChange}
			onEdit={onEdit}
			onDelete={onDelete}
			disabled={disabled}
			className={className}
		>
			<div className="space-y-2">
				<Label className="text-base font-semibold">
					Đáp án (chọn đáp án đúng)
				</Label>
				<RadioGroup
					value={
						typeof correctOptionIndex === "number"
							? String(correctOptionIndex)
							: undefined
					}
					onValueChange={(value) => onCorrectOptionChange?.(Number(value))}
					disabled={disabled}
					className="space-y-2"
				>
					{options.map((option, optionIndex) => (
						<div
							key={`${index}-option-${option.id}`}
							className="flex items-center gap-2"
						>
							<RadioGroupItem
								value={String(optionIndex)}
								id={`${index}-option-${optionIndex}`}
								disabled={disabled}
							/>
							<Input
								value={option.value}
								onChange={(event) =>
									onOptionChange(option.id, event.target.value)
								}
								placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
								disabled={disabled}
								data-question-field="multiple-choice-option"
								data-multiple-choice-option-id={option.id}
							/>
						</div>
					))}
				</RadioGroup>
			</div>
		</QuestionCard>
	);
}

export type { MultipleChoiceQuestionCardProps };
