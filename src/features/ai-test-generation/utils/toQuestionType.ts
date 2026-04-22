import type { QuestionType } from "@/shared/constants/questionOption";

const toQuestionType = (value: string): QuestionType => {
	const normalized = value?.toLowerCase() ?? "";

	if (normalized === "fill_in_the_blank") {
		return "Điền từ";
	}
	return "Trắc nghiệm";
};

export default toQuestionType;
