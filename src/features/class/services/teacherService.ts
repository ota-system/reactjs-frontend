import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { TeacherOverviewResponse } from "../type";

export const getTeacherOverview = async () => {
	const response: ApiResponse<TeacherOverviewResponse> = await httpClient.get(
		"/api/v1/users/me/class-stats",
	);
	return response;
};
