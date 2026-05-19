import type {
	Difficulty,
	QuestionType,
} from "@/shared/constants/questionOption";
import toDifficulty from "./toDifficulty";
import toQuestionType from "./toQuestionType";
import translateCorrectOptionIndex from "./translateCorrectOptionIndex";

type OptionItem = { id: string; value: string };

export interface GeneratedQuestionUI {
	id: string;
	question: string;
	questionType: QuestionType;
	subject: string;
	difficulty: Difficulty;
	options: OptionItem[];
	correctOptionIndex: number;
	correctAnswer: string;
	explanation?: string;
}

const defaultOptions = (): OptionItem[] => [
	{ id: "0", value: "" },
	{ id: "1", value: "" },
	{ id: "2", value: "" },
	{ id: "3", value: "" },
];

const mapGeneratedQuestionToUI = (raw: {
	id?: number;
	question?: string;
	topic?: string;
	difficulty?: string;
	options?: Array<string>;
	questionType?: string;
	answer?: string;
	explanation?: string;
}): GeneratedQuestionUI => {
	const options = Array.isArray(raw.options) ? raw.options : [];

	const normalizedOptions = defaultOptions().map((fallback, index) => {
		const option = options[index];

		if (typeof option === "string") {
			return { id: String(index), value: option };
		}

		return fallback;
	}) as OptionItem[];

	return {
		id: String(raw.id ?? `${Date.now()}-${Math.random()}`),
		question: raw.question ?? "",
		questionType: toQuestionType(raw.questionType ?? ""),
		subject: raw.topic ?? "",
		difficulty: toDifficulty(raw.difficulty),
		options: normalizedOptions,
		correctOptionIndex: translateCorrectOptionIndex(raw.answer ?? ""),
		correctAnswer: raw.answer ?? "",
		explanation: raw.explanation ?? "",
	};
};

export type { OptionItem };
export default mapGeneratedQuestionToUI;
