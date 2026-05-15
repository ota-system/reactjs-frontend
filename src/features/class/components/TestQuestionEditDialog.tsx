import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type {
	GeneratedQuestionUI,
	OptionItem,
} from "@/features/ai-test-generation/utils/mapGeneratedQuestionToUI";
import FillInBlankQuestionCard from "@/shared/components/FillInBlankQuestionCard";
import MultipleChoiceQuestionCard from "@/shared/components/MultipleChoiceQuestionCard";
import type { QuestionType } from "@/shared/constants/questionOption";
import { QuestionTypeEnum } from "@/shared/constants/questionOption";

interface TestQuestionEditDialogProps {
	open: boolean;
	question: GeneratedQuestionUI | null;
	questionNumber: number;
	onOpenChange: (open: boolean) => void;
	onSave: (question: GeneratedQuestionUI) => void | Promise<void>;
}

const cloneQuestion = (question: GeneratedQuestionUI): GeneratedQuestionUI => ({
	...question,
	options: question.options.map((option) => ({ ...option })) as [
		OptionItem,
		OptionItem,
		OptionItem,
		OptionItem,
	],
});

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

export default function TestQuestionEditDialog({
	open,
	question,
	questionNumber,
	onOpenChange,
	onSave,
}: TestQuestionEditDialogProps) {
	const [draftQuestion, setDraftQuestion] =
		useState<GeneratedQuestionUI | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (open && question) {
			setDraftQuestion(cloneQuestion(question));
			return;
		}

		if (!open) {
			setDraftQuestion(null);
			setIsSaving(false);
		}
	}, [open, question]);

	if (!question || !draftQuestion) {
		return null;
	}

	const isFillInBlank =
		draftQuestion.questionType === QuestionTypeEnum.FILL_IN_BLANK;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Chỉnh sửa câu {questionNumber}</DialogTitle>
					<DialogDescription>
						Cập nhật nội dung câu hỏi rồi lưu lại để áp dụng thay đổi.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{isFillInBlank ? (
						<FillInBlankQuestionCard
							index={questionNumber}
							question={draftQuestion.question}
							difficulty={draftQuestion.difficulty}
							questionType={draftQuestion.questionType}
							correctAnswer={draftQuestion.correctAnswer}
							onQuestionChange={(value) =>
								setDraftQuestion((current) =>
									current ? { ...current, question: value } : current,
								)
							}
							onDifficultyChange={(value) =>
								setDraftQuestion((current) =>
									current ? { ...current, difficulty: value } : current,
								)
							}
							onQuestionTypeChange={(value: QuestionType) =>
								setDraftQuestion((current) =>
									current ? { ...current, questionType: value } : current,
								)
							}
							onCorrectAnswerChange={(value) =>
								setDraftQuestion((current) =>
									current ? { ...current, correctAnswer: value } : current,
								)
							}
						/>
					) : (
						<MultipleChoiceQuestionCard
							index={questionNumber}
							question={draftQuestion.question}
							difficulty={draftQuestion.difficulty}
							questionType={draftQuestion.questionType}
							options={draftQuestion.options}
							onQuestionChange={(value) =>
								setDraftQuestion((current) =>
									current ? { ...current, question: value } : current,
								)
							}
							onDifficultyChange={(value) =>
								setDraftQuestion((current) =>
									current ? { ...current, difficulty: value } : current,
								)
							}
							onQuestionTypeChange={(value: QuestionType) =>
								setDraftQuestion((current) =>
									current ? { ...current, questionType: value } : current,
								)
							}
							onOptionChange={(optionId, value) =>
								setDraftQuestion((current) =>
									current
										? updateQuestionOptions(current, optionId, value)
										: current,
								)
							}
							correctOptionIndex={draftQuestion.correctOptionIndex}
							onCorrectOptionChange={(value) =>
								setDraftQuestion((current) =>
									current ? { ...current, correctOptionIndex: value } : current,
								)
							}
						/>
					)}
				</div>

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isSaving}
						className="cursor-pointer"
					>
						Hủy
					</Button>
					<Button
						type="button"
						disabled={isSaving}
						onClick={async () => {
							setIsSaving(true);
							try {
								await onSave(draftQuestion);
								onOpenChange(false);
							} finally {
								setIsSaving(false);
							}
						}}
						className="cursor-pointer"
					>
						{isSaving ? "Đang lưu..." : "Lưu thay đổi"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
