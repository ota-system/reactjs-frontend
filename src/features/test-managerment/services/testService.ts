import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { StudentResponse, TestSummaryStats } from "../type";

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
	page: number = 1,
): Promise<StudentResponse[]> => {
	const response: ApiResponse<StudentResponse[]> = await httpClient.get(
		`/api/v1/tests/${testId}/students?page=${page}`,
		//TO DO: update API to support pagination later
	);
	return response.data;
};
