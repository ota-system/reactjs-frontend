import { useQuery } from "@tanstack/react-query";
import { fetchClassDetail } from "../services/classService";

export const useClassDetailQuery = (classId: string | undefined) => {
	return useQuery({
		queryKey: ["class-detail", classId],
		queryFn: () => fetchClassDetail(classId as string),
		staleTime: 1000 * 60 * 30, // 30 minutes
		enabled: !!classId,
	});
};
