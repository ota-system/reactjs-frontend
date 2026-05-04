import { useQuery } from "@tanstack/react-query";
import { getExamsByClass } from "../services/examService";

export const useExamListQuery = (classId: string | undefined) => {
	return useQuery({
		queryKey: ["exams", classId],
		queryFn: () => getExamsByClass(classId!),
		enabled: !!classId,
	});
};
