import { useQuery } from "@tanstack/react-query";
import type { HttpError, PageMetaData } from "@/shared/type";
import { getTestQuestions } from "../services/testService";
import type { TestQuestionResponse } from "../types/TakingTest";

const LIMIT = 10;

const useTestQuestionsQuery = (testId: string, page: number) => {
	return useQuery<
		{ data: TestQuestionResponse; metadata: PageMetaData },
		HttpError
	>({
		queryKey: ["test-questions", testId, page],
		queryFn: () => getTestQuestions(testId, page, LIMIT),
		enabled: !!testId,
	});
};

export default useTestQuestionsQuery;
