import { useQuery } from "@tanstack/react-query";
import { getStudentClassStats } from "../services/userService";

export const useClassStatsQuery = () => {
	return useQuery({
		queryKey: ["student-class-stats"],
		queryFn: getStudentClassStats,
	});
};
