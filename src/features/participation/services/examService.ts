import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { ExamDetail, ExamSummary } from "../types/exam.type";

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
