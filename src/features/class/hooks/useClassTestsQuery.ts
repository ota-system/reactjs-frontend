import { useQuery } from "@tanstack/react-query";
import { FIVE_MINUTES } from "@/shared/constants/time";
import { fetchClassTests } from "../services/classService";

export const useClassTestsQuery = (classId: string) => {
	return useQuery({
		queryKey: ["class-tests", classId],
		queryFn: async () => {
			const res = await fetchClassTests(classId);
			return res.data;
		},
		staleTime: FIVE_MINUTES,
		enabled: !!classId,
	});
};
