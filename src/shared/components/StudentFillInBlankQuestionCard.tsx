import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface StudentFillInBlankQuestionCardProps {
	index: number;
	points?: number;
	topic: string;
	question: string;
	answer: string;
	onAnswerChange: (value: string) => void;
	disabled?: boolean;
	className?: string;
}

export default function StudentFillInBlankQuestionCard({
	index,
	points,
	topic,
	question,
	answer,
	onAnswerChange,
	disabled = false,
	className,
}: StudentFillInBlankQuestionCardProps) {
	return (
		<Card className={cn("rounded-2xl border py-0 h-fit", className)}>
			<CardContent className="space-y-6 p-5 sm:p-6">
				<div className="flex flex-wrap items-center gap-2">
					<span className="rounded-md border bg-muted px-2 py-1 text-xs font-semibold text-[var(--primary-color)]">
						Câu {index}
					</span>
					{typeof points === "number" && (
						<span className="rounded-md border px-2 py-1 text-xs font-semibold text-[var(--primary-color)]">
							{points} điểm
						</span>
					)}
					{
						<span className="rounded-md border px-2 py-1 text-xs font-semibold text-[var(--primary-color)]">
							{topic}
						</span>
					}
				</div>

				<h3 className="text-2xl font-semibold text-[var(--primary-color)]">
					{question}
				</h3>

				<Input
					value={answer}
					onChange={(event) => onAnswerChange(event.target.value)}
					placeholder="Nhập câu trả lời của bạn..."
					disabled={disabled}
					className="h-10"
				/>
			</CardContent>
		</Card>
	);
}

export type { StudentFillInBlankQuestionCardProps };
