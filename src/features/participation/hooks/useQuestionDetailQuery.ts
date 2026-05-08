import { useQuery } from "@tanstack/react-query";
import { getQuestionDetail } from "../services/studentResultService";

export const useQuestionDetailQuery = (
	resultId: string | undefined,
	questionId: string | undefined,
) => {
	return useQuery({
		queryKey: ["question-detail", resultId, questionId],
		queryFn: () => getQuestionDetail(resultId!, questionId!),
		enabled: !!resultId && !!questionId,
	});
};
