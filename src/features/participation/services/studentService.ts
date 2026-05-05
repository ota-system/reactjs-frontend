import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { OverallResults, StudentResult } from "../types/studentResult";

const studentApi = "/api/v1/students";

export const fetchStudentResults = async (
	studentId: string,
): Promise<StudentResult[]> => {
	const response: ApiResponse<StudentResult[]> = await httpClient.get(
		`${studentApi}/${studentId}/student-results`,
	);
	return response.data;
};

export const fetchOverallResults = async (
	studentId: string,
): Promise<OverallResults> => {
	const response: ApiResponse<OverallResults> = await httpClient.get(
		`${studentApi}/${studentId}/overall-results`,
	);
	return response.data;
};
