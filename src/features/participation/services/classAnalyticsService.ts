import { studentApi } from "@/core/api/endpoints";
import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { ClassAnalyticsItem } from "../types/classAnalytics";

export const fetchClassAnalytics = async (
	studentId: string,
	classId: string,
): Promise<ApiResponse<ClassAnalyticsItem[]>> => {
	const response: ApiResponse<ClassAnalyticsItem[]> = await httpClient.get(
		`${studentApi}/${studentId}/class-analytics?classId=${classId}`,
	);
	return response;
};
