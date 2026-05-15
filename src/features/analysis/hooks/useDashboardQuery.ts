import { useQuery } from "@tanstack/react-query";
import { FIVE_MINUTES } from "@/shared/constants/time";
import {
	fetchClassDashboardData,
	fetchTestDashboardData,
} from "../services/dashboardService";

export const useClassDashboardQuery = (classId: string | undefined) => {
	return useQuery({
		queryKey: ["class-dashboard", classId],
		queryFn: () => fetchClassDashboardData(classId as string),
		staleTime: FIVE_MINUTES,
		enabled: !!classId,
	});
};

export const useTestDashboardQuery = (
	classId: string | undefined,
	testId?: string,
) => {
	return useQuery({
		queryKey: ["test-dashboard", classId, testId],
		queryFn: () => fetchTestDashboardData(classId as string, testId),
		staleTime: FIVE_MINUTES,
		enabled: !!classId,
	});
};
