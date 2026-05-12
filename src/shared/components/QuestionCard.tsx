import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Difficulty, QuestionType } from "../constants/questionOption";
import {
	DIFFICULTY_OPTIONS,
	QUESTION_TYPE_OPTIONS,
	QuestionTypeEnum,
} from "../constants/questionOption";
import ConfirmedDialog from "./ConfirmedDialog";
import SelectionInput from "./SelectionInput";

interface QuestionCardProps {
	index: number;
	question: string;
	difficulty: Difficulty;
	questionType?: QuestionType;
	onQuestionChange: (value: string) => void;
	onDifficultyChange: (value: Difficulty) => void;
	onQuestionTypeChange?: (value: QuestionType) => void;
	onDelete?: () => void;
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
}

export default function QuestionCard({
	index,
	question,
	difficulty,
	questionType = QuestionTypeEnum.MULTIPLE_CHOICE,
	onQuestionChange,
	onDifficultyChange,
	onQuestionTypeChange,
	onDelete,
	disabled = false,
	className,
	children,
}: QuestionCardProps) {
	return (
		<Card className={cn("rounded-2xl border h-fit py-0", className)}>
			<CardContent className="space-y-6 p-5 sm:p-6">
				<div className="flex items-start justify-between gap-3">
					<div className="flex flex-wrap items-center gap-2">
						<span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-foreground">
							Câu {index}
						</span>
						<span className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-foreground">
							{questionType}
						</span>
						<span className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-foreground">
							{difficulty}
						</span>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								disabled={!onDelete || disabled}
								aria-label={`Xóa câu ${index}`}
								className="text-red-500 hover:bg-red-50 focus-visible:bg-red-50 cursor-pointer"
							>
								<Trash2 className="size-4" />
							</Button>
						</DialogTrigger>
						<ConfirmedDialog
							title={`Bạn có chắc muốn xóa câu ${index}?`}
							description={`Nội dung câu hỏi: ${question}`}
							action={onDelete!}
							secondaryAction={{
								label: "Xóa ngay",
								action: () => {
									onDelete!();
								},
								variant: "destructive",
							}}
						/>
					</Dialog>
				</div>

				<div className="space-y-2">
					<Label className="text-base font-semibold">Câu hỏi *</Label>
					<Textarea
						value={question}
						onChange={(event) => onQuestionChange(event.target.value)}
						placeholder="Nhập nội dung câu hỏi..."
						disabled={disabled}
						rows={2}
						className="resize-none"
						data-question-field="question"
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<SelectionInput
						value={difficulty}
						options={DIFFICULTY_OPTIONS}
						onValueChange={(value) => onDifficultyChange(value as Difficulty)}
						disabled={disabled}
						placeholder="Chọn độ khó"
						label="Độ khó"
					/>
					<SelectionInput
						value={questionType}
						options={QUESTION_TYPE_OPTIONS}
						onValueChange={(value) =>
							onQuestionTypeChange?.(value as QuestionType)
						}
						disabled={disabled}
						placeholder="Chọn loại câu hỏi"
						label="Loại câu hỏi"
					/>
				</div>

				{children}
			</CardContent>
		</Card>
	);
}

export type { QuestionCardProps };
