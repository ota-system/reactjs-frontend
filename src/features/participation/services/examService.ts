import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type {
	ExamInfo,
	ExamQuestion,
	ExamQuestionsMeta,
} from "../types/TakingTest";

export const getTestInfo = async (testId: string) => {
	const response = (await httpClient.get(
		`/api/v1/tests/${testId}`,
	)) as ApiResponse<ExamInfo>;
	return response;
};

export const getTestQuestions = async (
	testId: string,
	page: number,
	limit = 10,
): Promise<{ data: ExamQuestion[]; metadata: ExamQuestionsMeta }> => {
	const response = (await httpClient.get(
		`/api/v1/tests/${testId}/questions?page=${page}&limit=${limit}`,
	)) as { data: ExamQuestion[]; metadata: ExamQuestionsMeta };
	return response;
};
