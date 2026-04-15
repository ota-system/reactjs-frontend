import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import SelectionInput from "./SelectionInput";

type Difficulty = "Dễ" | "Trung bình" | "Khó";
type QuestionType = "Trắc nghiệm" | "Điền từ";

const DIFFICULTY_OPTIONS: Difficulty[] = ["Dễ", "Trung bình", "Khó"];
const QUESTION_TYPE_OPTIONS: QuestionType[] = ["Trắc nghiệm", "Điền từ"];

interface QuestionCardProps {
	index: number;
	question: string;
	subject: string;
	difficulty: Difficulty;
	questionType?: QuestionType;
	onQuestionChange: (value: string) => void;
	onSubjectChange: (value: string) => void;
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
	subject,
	difficulty,
	questionType = "Trắc nghiệm",
	onQuestionChange,
	onSubjectChange,
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
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={onDelete}
						disabled={!onDelete || disabled}
						aria-label={`Xóa câu ${index}`}
					>
						<Trash2 className="size-4" />
					</Button>
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
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<Label className="text-base font-semibold">Chủ đề</Label>
						<Input
							value={subject}
							onChange={(event) => onSubjectChange(event.target.value)}
							placeholder="VD: Grammar"
							disabled={disabled}
						/>
					</div>
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
