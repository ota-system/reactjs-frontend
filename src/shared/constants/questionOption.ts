type Difficulty = "Dễ" | "Trung bình" | "Khó";
type QuestionType = "Trắc nghiệm" | "Điền từ" | "Đúng sai";
type QuestionTypeAPI = "multiple_choice" | "fill_in_the_blank" | "true_false";

enum LevelEnum {
	EASY = "Dễ",
	MEDIUM = "Trung bình",
	HARD = "Khó",
}

enum QuestionTypeEnum {
	MULTIPLE_CHOICE = "Trắc nghiệm",
	FILL_IN_BLANK = "Điền từ",
	TRUE_FALSE = "Đúng sai",
	MULTIPLE_CHOICE_API = "multiple_choice",
	FILL_IN_BLANK_API = "fill_in_the_blank",
	TRUE_FALSE_API = "true_false",
}

const DIFFICULTY_OPTIONS: Difficulty[] = ["Dễ", "Trung bình", "Khó"];
const QUESTION_TYPE_OPTIONS: QuestionType[] = [
	"Trắc nghiệm",
	"Điền từ",
	"Đúng sai",
];

export type { Difficulty, QuestionType, QuestionTypeAPI };
export {
	DIFFICULTY_OPTIONS,
	LevelEnum,
	QUESTION_TYPE_OPTIONS,
	QuestionTypeEnum,
};
