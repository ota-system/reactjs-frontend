import { useQuery } from "@tanstack/react-query";
import { getTestQuestions } from "../services/examService";

const LIMIT = 10;

const useExamQuestionsQuery = (testId: string, page: number) => {
	return useQuery({
		queryKey: ["exam-questions", testId, page],
		queryFn: () => getTestQuestions(testId, page, LIMIT),
		enabled: !!testId,
	});
};

export default useExamQuestionsQuery;
