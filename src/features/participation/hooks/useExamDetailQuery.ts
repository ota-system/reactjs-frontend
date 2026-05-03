import { useQuery } from "@tanstack/react-query";
import { getExamDetail } from "../services/examService";

export const useExamDetailQuery = (examId: string | undefined) => {
	return useQuery({
		queryKey: ["exam-detail", examId],
		queryFn: () => getExamDetail(examId!),
		enabled: !!examId,
	});
};
