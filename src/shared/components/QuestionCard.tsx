import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/lib/toast";
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
	onEdit?: () => void;
	onDelete?: () => void;
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
	notAllowEdit?: boolean;
}

export default function QuestionCard({
	index,
	question,
	difficulty,
	questionType = QuestionTypeEnum.MULTIPLE_CHOICE,
	onQuestionChange,
	onDifficultyChange,
	onQuestionTypeChange,
	onEdit,
	onDelete,
	disabled = false,
	className,
	children,
	notAllowEdit = false,
}: QuestionCardProps) {
	const editAction = onEdit;
	const deleteAction = onDelete;
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const hasCombinedActions = Boolean(editAction && deleteAction);

	const deleteDialogComponent = (action: () => void) => {
		return (
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<ConfirmedDialog
					title={`Bạn có chắc muốn xóa câu ${index}?`}
					description={`Nội dung câu hỏi: ${question}`}
					action={action}
					secondaryAction={{
						label: "Xóa ngay",
						action: () => {
							action();
						},
						variant: "destructive",
					}}
				/>
			</Dialog>
		);
	};

	const deleteActionButtonComponent = () => {
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={() => setIsDeleteDialogOpen(true)}
						aria-label={`Xóa câu ${index}`}
						className="cursor-pointer text-red-500 hover:bg-red-50 focus-visible:bg-red-50"
					>
						<Trash2 className="size-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="top">Xóa câu {index}</TooltipContent>
			</Tooltip>
		);
	};

	const editActionComponent = (action: () => void) => {
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={action}
						aria-label={`Chỉnh sửa câu ${index}`}
						className="cursor-pointer"
					>
						<PencilLine className="size-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="top">Chỉnh sửa câu {index}</TooltipContent>
			</Tooltip>
		);
	};

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
					<div className="flex items-center gap-1">
						{hasCombinedActions ? (
							<DropdownMenu>
								<Tooltip>
									<TooltipTrigger asChild>
										<DropdownMenuTrigger asChild>
											<Button
												type="button"
												variant="ghost"
												size="icon-sm"
												aria-label={`Tùy chọn câu ${index}`}
												className="cursor-pointer"
											>
												<MoreVertical className="size-4" />
											</Button>
										</DropdownMenuTrigger>
									</TooltipTrigger>
									<TooltipContent side="top">
										Tùy chọn câu {index}
									</TooltipContent>
								</Tooltip>
								<DropdownMenuContent align="end" className="w-44">
									<DropdownMenuItem
										onSelect={() => {
											if (notAllowEdit) {
												toast.info(
													"Bài thi đã kết thúc, không thể chỉnh sửa câu hỏi.",
												);
												return;
											}
											editAction?.();
										}}
									>
										<PencilLine className="size-4" />
										Chỉnh sửa
									</DropdownMenuItem>
									<DropdownMenuItem
										variant="destructive"
										onSelect={() => {
											if (notAllowEdit) {
												toast.info(
													"Bài thi đã kết thúc, không thể xóa câu hỏi.",
												);
												return;
											}
											setIsDeleteDialogOpen(true);
										}}
									>
										<Trash2 className="size-4" />
										Xóa
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<>
								{editAction && editActionComponent(editAction)}
								{deleteAction && deleteActionButtonComponent()}
							</>
						)}
						{deleteAction && deleteDialogComponent(deleteAction)}
					</div>
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
