import { useQuery } from "@tanstack/react-query";
import { FIVE_MINUTES } from "@/shared/constants/time";
import { fetchClassTests } from "../services/classService";

export const useClassTestsQuery = (classId: string | undefined) => {
	return useQuery({
		queryKey: ["class-tests", classId],
		queryFn: () => fetchClassTests(classId as string),
		staleTime: FIVE_MINUTES,
		enabled: !!classId,
	});
};
