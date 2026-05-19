export const DIFFICULTY_TO_API: Record<string, string> = {
	Dễ: "easy",
	"Trung bình": "medium",
	Khó: "hard",
};

export const QUESTION_TYPE_TO_API: Record<string, string> = {
	"Trắc nghiệm": "multiple_choice",
	"Đúng sai": "true_false",
	"Điền từ": "fill_in_the_blank",
};

export const normalizeDifficultyToApi = (value: string) =>
	DIFFICULTY_TO_API[value] ?? "medium";

export const normalizeQuestionTypeToApi = (value: string) =>
	QUESTION_TYPE_TO_API[value] ?? "multiple_choice";

export const isMultipleChoiceUI = (value: string) =>
	value === "Trắc nghiệm" || value === "Đúng sai";
