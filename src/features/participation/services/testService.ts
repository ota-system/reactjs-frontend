import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse, PageMetaData } from "@/shared/type";
import type { TestDetail, TestSummary } from "../types/index";
import type { TestInfo, TestQuestionResponse } from "../types/TakingTest";

const classApi = "/api/v1/classes";

export const getTestsByClass = async (
	classId: string,
): Promise<ApiResponse<TestSummary[]>> => {
	const response: ApiResponse<TestSummary[]> = await httpClient.get(
		`${classApi}/${classId}/tests`,
	);

	return response;
};

export const getTestDetail = async (
	testId: string,
): Promise<ApiResponse<TestDetail>> => {
	const response: ApiResponse<TestDetail> = await httpClient.get(
		`${classApi}/tests/${testId}`,
	);

	return response;
};

export const getTestInfo = async (testId: string) => {
	const response = (await httpClient.get(
		`/api/v1/tests/${testId}`,
	)) as ApiResponse<TestInfo>;
	return response;
};

export const getTestQuestions = async (
	testId: string,
	page: number,
	limit = 10,
) => {
	const response = (await httpClient.get(
		`/api/v1/tests/${testId}/questions?page=${page}&limit=${limit}`,
	)) as { data: TestQuestionResponse; metadata: PageMetaData };
	return response;
};
