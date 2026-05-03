import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface StudentChoiceOption {
	id: string;
	content: string;
}

interface StudentMultipleChoiceQuestionCardProps {
	index: number;
	points?: number;
	topic?: string;
	question: string;
	options: StudentChoiceOption[];
	selectedOptionId?: string;
	onSelectOption: (optionId: string) => void;
	disabled?: boolean;
	className?: string;
}

export default function StudentMultipleChoiceQuestionCard({
	index,
	points,
	topic,
	question,
	options,
	selectedOptionId,
	onSelectOption,
	disabled = false,
	className,
}: StudentMultipleChoiceQuestionCardProps) {
	return (
		<Card className={cn("rounded-2xl border py-0 h-fit", className)}>
			<CardContent className="space-y-6 p-5 sm:p-6">
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-md bg-muted border px-2 py-1 text-xs font-semibold text-[var(--primary-color)]">
						Câu {index}
					</span>
					{typeof points === "number" ? (
						<span className="rounded-md border px-2 py-1 text-xs font-semibold text-[var(--primary-color)]">
							{points} điểm
						</span>
					) : null}
					{topic ? (
						<span className="rounded-md border px-2 py-1 text-xs font-semibold text-[var(--primary-color)]">
							{topic}
						</span>
					) : null}
				</div>

				<p className="text-xl text-[var(--primary-color)]">{question}</p>

				<RadioGroup
					value={selectedOptionId}
					onValueChange={onSelectOption}
					disabled={disabled}
					className="space-y-3"
				>
					{options.map((option) => {
						const optionLabel = String.fromCharCode(
							65 + options.indexOf(option),
						);
						const optionElementId = `student-option-${option.id}`;
						const isSelected = selectedOptionId === option.id;

						return (
							<Label
								key={option.id}
								htmlFor={optionElementId}
								className={cn(
									"flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-4 text-base font-medium transition-colors",
									isSelected
										? "border-primary/60 bg-primary/5"
										: "border-border bg-background",
									disabled && "cursor-not-allowed opacity-70",
								)}
							>
								<RadioGroupItem value={option.id} id={optionElementId} />
								<span className="min-w-6">{optionLabel}.</span>
								<span>{option.content}</span>
							</Label>
						);
					})}
				</RadioGroup>
			</CardContent>
		</Card>
	);
}

export type { StudentChoiceOption, StudentMultipleChoiceQuestionCardProps };
