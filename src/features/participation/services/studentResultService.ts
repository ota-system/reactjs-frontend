import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { OverallResult, QuestionDetail } from "../types/detailedResult";

const BASE = "/api/v1/student-results";

export const getOverallResult = async (id: string): Promise<OverallResult> => {
	const response: ApiResponse<OverallResult> = await httpClient.get(
		`${BASE}/${id}`,
	);
	return response.data;
};

export const getQuestionDetail = async (
	id: string,
	questionId: string,
): Promise<QuestionDetail> => {
	const response: ApiResponse<QuestionDetail> = await httpClient.get(
		`${BASE}/${id}/questions/${questionId}`,
	);
	return response.data;
};
