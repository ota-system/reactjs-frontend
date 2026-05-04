import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { SubmitTestRequestDto, SubmitTestResult } from "../types";

export const testSubmissionService = {
	submitTest: async (
		payload: SubmitTestRequestDto,
	): Promise<ApiResponse<SubmitTestResult>> => {
		return httpClient.post<ApiResponse<SubmitTestResult>>(
			"/api/v1/tests/submit",
			payload,
		);
	},
};
