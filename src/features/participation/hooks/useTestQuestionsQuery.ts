import { useQuery } from "@tanstack/react-query";
import { getTestQuestions } from "../services/testService";

const LIMIT = 10;

const useTestQuestionsQuery = (testId: string, page: number) => {
	return useQuery({
		queryKey: ["exam-questions", testId, page],
		queryFn: () => getTestQuestions(testId, page, LIMIT),
		enabled: !!testId,
	});
};

export default useTestQuestionsQuery;
