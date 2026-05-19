import {
	type QuestionType,
	QuestionTypeEnum,
} from "@/shared/constants/questionOption";

const toQuestionType = (value: string): QuestionType => {
	const normalized = value?.toLowerCase() ?? "";

	if (normalized === QuestionTypeEnum.FILL_IN_BLANK_API) {
		return "Điền từ";
	} else if (normalized === QuestionTypeEnum.MULTIPLE_CHOICE_API) {
		return "Trắc nghiệm";
	}
	return "Đúng sai";
};

export default toQuestionType;
