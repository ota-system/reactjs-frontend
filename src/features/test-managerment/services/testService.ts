import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { TestStudentResponse, TestSummaryStats } from "../type";

export const fetchTestSummary = async (
	testId: string,
): Promise<TestSummaryStats> => {
	const response: ApiResponse<TestSummaryStats> = await httpClient.get(
		`/api/v1/tests/${testId}/summary`,
	);
	return response.data;
};

export const fetchTestStudents = async (
	testId: string,
): Promise<TestStudentResponse> => {
	const response: ApiResponse<TestStudentResponse> = await httpClient.get(
		`/api/v1/tests/${testId}/students`,
	);
	return response.data;
};
