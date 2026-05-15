import { useQuery } from "@tanstack/react-query";
import type {
	GeneratedQuestionUI,
	OptionItem,
} from "@/features/ai-test-generation/utils/mapGeneratedQuestionToUI";
import toDifficulty from "@/features/ai-test-generation/utils/toDifficulty";
import toQuestionType from "@/features/ai-test-generation/utils/toQuestionType";
import translateCorrectOptionIndex from "@/features/ai-test-generation/utils/translateCorrectOptionIndex";
import {
	getDetailedTestInfo,
	getTestQuestions,
} from "@/features/participation/services/testService";
import type { TestDetail } from "@/features/participation/types";
import type { TestQuestion } from "@/features/participation/types/TakingTest";
import { QuestionTypeEnum } from "@/shared/constants/questionOption";
import { FIVE_MINUTES } from "@/shared/constants/time";

const PAGE_SIZE = 50;

const normalizeChoices = (
	choices: TestQuestion["choices"],
): [OptionItem, OptionItem, OptionItem, OptionItem] => {
	return [0, 1, 2, 3].map((index) => ({
		id: String(choices?.[index]?.id ?? index),
		value: choices?.[index]?.answer ?? "",
	})) as [OptionItem, OptionItem, OptionItem, OptionItem];
};

const fetchAllTestQuestions = async (testId: string) => {
	const firstPage = await getTestQuestions(testId, 1, PAGE_SIZE);
	const totalPages = Math.max(firstPage.metadata.totalPages, 1);
	const allQuestions = [...firstPage.data.questions];

	if (totalPages > 1) {
		const remainingPages = await Promise.all(
			Array.from({ length: totalPages - 1 }, (_, index) =>
				getTestQuestions(testId, index + 2, PAGE_SIZE),
			),
		);

		remainingPages.forEach((page) => {
			allQuestions.push(...page.data.questions);
		});
	}

	return allQuestions;
};

const mapQuestionToEditor = (
	question: TestQuestion,
	subject: string,
): GeneratedQuestionUI => ({
	id: question.id,
	question: question.question,
	questionType: toQuestionType(question.type),
	subject,
	difficulty: toDifficulty(question.level),
	options: normalizeChoices(question.choices),
	correctOptionIndex: translateCorrectOptionIndex(
		question.answer!,
		question.choices,
	),
	correctAnswer:
		question.type === QuestionTypeEnum.FILL_IN_BLANK_API
			? question.answer!
			: "",
});

export const useClassTestReviewQuery = (testId: string | undefined) => {
	return useQuery({
		queryKey: ["class-test-review", testId],
		staleTime: FIVE_MINUTES,
		enabled: !!testId,
		queryFn: async () => {
			const [testDetailResponse, questions] = await Promise.all([
				getDetailedTestInfo(testId!),
				fetchAllTestQuestions(testId!),
			]);

			return {
				testDetail: testDetailResponse.data as TestDetail,
				questions: questions.map((question) =>
					mapQuestionToEditor(question, testDetailResponse.data.topic),
				),
			};
		},
	});
};
