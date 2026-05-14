import { classApi } from "@/core/api/endpoints";
import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { ClassDashboardData, TestDashboardData } from "../types/dashboard";

export const fetchClassDashboardData = async (classId: string) => {
	const response: ApiResponse<ClassDashboardData> = await httpClient.get(
		`${classApi}/${classId}/dashboard/class-stats`,
	);
	return response;
};

export const fetchTestDashboardData = async (
	classId: string,
	testId?: string,
) => {
	const params = testId ? `?testId=${testId}` : "";
	const response: ApiResponse<TestDashboardData> = await httpClient.get(
		`${classApi}/${classId}/dashboard/test-stats${params}`,
	);
	return response;
};
