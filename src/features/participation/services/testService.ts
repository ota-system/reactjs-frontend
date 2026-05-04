import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse, PageMetaData } from "@/shared/type";
import type { TestInfo, TestQuestionResponse } from "../types/TakingTest";

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
