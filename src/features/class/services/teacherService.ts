import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { TeacherOverviewResponse } from "../type";

const TEACHER_API = "/api/v1/teachers";

export const getTeacherOverview = async (teacherId: string) => {
	const response: ApiResponse<TeacherOverviewResponse> = await httpClient.get(
		`${TEACHER_API}/${teacherId}/overview`,
	);
	return response;
};
