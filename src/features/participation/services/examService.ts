import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { ExamDetail, ExamSummary } from "../types/exam.type";
import type {
	ExamInfo,
	ExamInfoMeta,
	ExamQuestion,
	ExamQuestionsMeta,
} from "../types/TakingTest";

const classApi = "/api/v1/classes";

export const getExamsByClass = async (
	classId: string,
): Promise<ApiResponse<ExamSummary[]>> => {
	const response: ApiResponse<ExamSummary[]> = await httpClient.get(
		`${classApi}/${classId}/tests`,
	);
	return response;
};

export const getExamDetail = async (
	examId: string,
): Promise<ApiResponse<ExamDetail>> => {
	const response: ApiResponse<ExamDetail> = await httpClient.get(
		`${classApi}/tests/${examId}`,
	);
	return response;
};

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
