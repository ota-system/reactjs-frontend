import { useQuery } from "@tanstack/react-query";
import { getTeacherOverview } from "../services/teacherService";

export const useTeacherOverviewQuery = (teacherId: string | undefined) => {
	return useQuery({
		queryKey: ["teacher-overview", teacherId],
		queryFn: () => getTeacherOverview(teacherId!),
		enabled: !!teacherId,
	});
};
