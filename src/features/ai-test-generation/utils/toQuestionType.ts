import type { QuestionType } from "@/shared/constants/questionOption";

const toQuestionType = (value: string): QuestionType => {
	const normalized = value?.toLowerCase() ?? "";

	if (normalized === "fill_in_the_blank") {
		return "Điền từ";
	} else if (normalized === "multiple_choice") {
		return "Trắc nghiệm";
	}
	return "Đúng sai";
};

export default toQuestionType;
