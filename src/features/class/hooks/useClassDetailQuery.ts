import { useQuery } from "@tanstack/react-query";
import { THIRTY_MINUTES } from "@/shared/constants/time";
import { fetchClassDetail } from "../services/classService";

export const useClassDetailQuery = (classId: string | undefined) => {
	return useQuery({
		queryKey: ["class-detail", classId],
		queryFn: () => fetchClassDetail(classId as string),
		staleTime: THIRTY_MINUTES,
		enabled: !!classId,
	});
};
