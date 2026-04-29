import { httpClient } from "@/core/api/httpClient.api";
import type { SubmitTestRequestDto, SubmitTestResponse } from "../types";

export const testSubmissionService = {
	submitTest: async (
		payload: SubmitTestRequestDto,
	): Promise<SubmitTestResponse> => {
		return httpClient.post<SubmitTestResponse>("/tests/submit", payload);
	},
};
