type Difficulty = "Dễ" | "Trung bình" | "Khó";
type QuestionType = "Trắc nghiệm" | "Điền từ";

enum QuestionTypeEnum {
	MULTIPLE_CHOICE = "Trắc nghiệm",
	FILL_IN_BLANK = "Điền từ",
}

const DIFFICULTY_OPTIONS: Difficulty[] = ["Dễ", "Trung bình", "Khó"];
const QUESTION_TYPE_OPTIONS: QuestionType[] = ["Trắc nghiệm", "Điền từ"];

export type { Difficulty, QuestionType };
export { DIFFICULTY_OPTIONS, QUESTION_TYPE_OPTIONS, QuestionTypeEnum };
