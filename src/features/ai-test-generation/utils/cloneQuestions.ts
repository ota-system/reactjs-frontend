import type { GeneratedQuestionUI } from "../utils/mapGeneratedQuestionToUI";

const cloneQuestions = (
	questions: GeneratedQuestionUI[],
): GeneratedQuestionUI[] =>
	questions.map((question) => ({
		...question,
		options: question.options.map((option) => ({
			...option,
		})) as GeneratedQuestionUI["options"],
	}));

export default cloneQuestions;
