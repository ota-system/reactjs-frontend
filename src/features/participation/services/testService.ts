import { classApi, testApi } from "@/core/api/endpoints";
import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse, PageMetaData } from "@/shared/type";
import type { TestDetail, TestSummary } from "../types/index";
import type { TestInfo, TestQuestionResponse } from "../types/TakingTest";

export const getTestsByClass = async (
	classId: string,
): Promise<ApiResponse<TestSummary[]>> => {
	const response: ApiResponse<TestSummary[]> = await httpClient.get(
		`${classApi}/${classId}/tests`,
	);

	return response;
};

export const getDetailedTestInfo = async (
	testId: string,
): Promise<ApiResponse<TestDetail>> => {
	const response: ApiResponse<TestDetail> = await httpClient.get(
		`${testApi}/${testId}?detailed=true`,
	);

	return response;
};

export const getTestInfo = async (testId: string) => {
	const response = (await httpClient.get(
		`${testApi}/${testId}?detailed=false`,
	)) as ApiResponse<TestInfo>;
	return response;
};

export const getTestQuestions = async (
	testId: string,
	page: number,
	limit = 10,
) => {
	const response = (await httpClient.get(
		`${testApi}/${testId}/questions?page=${page}&limit=${limit}`,
	)) as { data: TestQuestionResponse; metadata: PageMetaData };
	return response;
};

export const saveFraudReport = async (report: {
	testId: string;
	fraudType: string;
}) => {
	const response = await httpClient.post(
		`${testApi}/${report.testId}/fraud-reports`,
		{ fraudType: report.fraudType },
	);
	return response as ApiResponse<null>;
};
