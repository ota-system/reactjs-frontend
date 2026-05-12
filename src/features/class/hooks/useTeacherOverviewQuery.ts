import { useQuery } from "@tanstack/react-query";
import { getTeacherOverview } from "../services/teacherService";

export const useTeacherOverviewQuery = () => {
	return useQuery({
		queryKey: ["teacher-overview"],
		queryFn: getTeacherOverview,
	});
};
