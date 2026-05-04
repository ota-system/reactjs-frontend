import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/shared/type";
import { testSubmissionService } from "../services/testSubmission.service";
import type { SubmitTestRequestDto, SubmitTestResult } from "../types";

export const useSubmitTest = () => {
	return useMutation({
		mutationFn: (
			payload: SubmitTestRequestDto,
		): Promise<ApiResponse<SubmitTestResult>> =>
			testSubmissionService.submitTest(payload),
		onSuccess: (_data, _variables) => {
			//TODO: Invalidate or update relevant queries here (releated to test results, user performance, etc.)
		},
		onSettled: (_data, _error, variables) => {
			const STORAGE_KEY = `taking-test-answers-${variables.testId}`;
			localStorage.removeItem(STORAGE_KEY);
		},
	});
};
