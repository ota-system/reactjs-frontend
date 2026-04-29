import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type {
	ExamInfo,
	ExamInfoMeta,
	ExamQuestion,
	ExamQuestionsMeta,
} from "../types/TakingTest";

export const getTestInfo = async (
	testId: string,
): Promise<{ data: ExamInfo; metadata: ExamInfoMeta }> => {
	const response = (await httpClient.get(
		`/api/v1/tests/${testId}`,
	)) as ApiResponse<ExamInfo> & { metadata: ExamInfoMeta };
	return { data: response.data, metadata: response.metadata };
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
