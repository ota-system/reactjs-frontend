import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type {
	OverallTestResult,
	QuestionDetail,
} from "../types/detailedResult";

const BASE = "/api/v1/student-results";

export const getOverallResult = async (id: string) => {
	const response: ApiResponse<OverallTestResult> = await httpClient.get(
		`${BASE}/${id}`,
	);
	return response;
};

export const getQuestionDetail = async (id: string, questionId: string) => {
	const response: ApiResponse<QuestionDetail> = await httpClient.get(
		`${BASE}/${id}/questions/${questionId}`,
	);
	return response;
};
