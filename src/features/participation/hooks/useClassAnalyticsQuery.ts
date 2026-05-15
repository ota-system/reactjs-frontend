import { useQuery } from "@tanstack/react-query";
import { fetchClassAnalytics } from "../services/classAnalyticsService";

export const useClassAnalyticsQuery = (
	studentId: string | undefined,
	classId: string | undefined,
) => {
	return useQuery({
		queryKey: ["class-analytics", studentId, classId],
		queryFn: () => fetchClassAnalytics(studentId as string, classId as string),
		select: (response) => response.data,
		enabled: !!studentId && !!classId,
	});
};
