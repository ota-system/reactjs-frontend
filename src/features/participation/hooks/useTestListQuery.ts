import { useQuery } from "@tanstack/react-query";
import { getTestsByClass } from "../services/testService";

export const useTestListQuery = (classId: string | undefined) => {
	return useQuery({
		queryKey: ["tests", classId],
		queryFn: () => getTestsByClass(classId!),
		enabled: !!classId,
	});
};
