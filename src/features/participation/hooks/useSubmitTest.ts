import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/shared/type";
import { FRAUD_COUNT_STORAGE_KEY_PREFIX } from "../constants";
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
			const answerStorageKey = `taking-test-answers-${variables.testId}`;
			const fraudStorageKey = `${FRAUD_COUNT_STORAGE_KEY_PREFIX}${variables.testId}`;
			localStorage.removeItem(answerStorageKey);
			localStorage.removeItem(fraudStorageKey);
		},
	});
};
