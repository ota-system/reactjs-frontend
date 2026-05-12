import { httpClient } from "@/core/api/httpClient.api";
import type { StudentClassStatsResponse } from "@/features/class/type";
import type { ApiResponse } from "@/shared/type";

export const getStudentClassStats = async () => {
	const response: ApiResponse<StudentClassStatsResponse> = await httpClient.get(
		"/api/v1/users/me/class-stats",
	);
	return response;
};
