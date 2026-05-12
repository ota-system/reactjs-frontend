import { QuestionTypeEnum } from "@/shared/constants/questionOption";
import type { GeneratedQuestionUI } from "./mapGeneratedQuestionToUI";

export interface InvalidQuestionIssue {
	questionId: string;
	field: "question" | "fill-in-blank-answer" | "multiple-choice-option";
	optionId?: string;
}

const isMultipleChoiceQuestion = (questionType: string) =>
	questionType === QuestionTypeEnum.MULTIPLE_CHOICE;

const findFirstInvalidQuestionIssue = (
	questions: GeneratedQuestionUI[],
): InvalidQuestionIssue | null => {
	for (const question of questions) {
		if (!question.question.trim()) {
			return { questionId: question.id, field: "question" };
		}

		if (isMultipleChoiceQuestion(question.questionType)) {
			const normalizedOptions = question.options.map((option) =>
				option.value.trim(),
			);
			const hasEnoughOptions = normalizedOptions.filter(Boolean).length >= 2;

			if (!hasEnoughOptions) {
				const firstEmptyOption = question.options.find(
					(option) => !option.value.trim(),
				);

				return {
					questionId: question.id,
					field: "multiple-choice-option",
					optionId: firstEmptyOption?.id ?? "0",
				};
			}

			const selectedAnswer =
				normalizedOptions[question.correctOptionIndex] ?? "";

			if (!selectedAnswer) {
				return {
					questionId: question.id,
					field: "multiple-choice-option",
					optionId: String(question.correctOptionIndex),
				};
			}
		}

		if (!question.correctAnswer.trim()) {
			return { questionId: question.id, field: "fill-in-blank-answer" };
		}
	}

	return null;
};

export default findFirstInvalidQuestionIssue;
