import { useMutation } from "@tanstack/react-query";
import { testSubmissionService } from "../services/testSubmission.service";
import type { SubmitTestRequestDto, SubmitTestResponse } from "../types";

export const useSubmitTest = () => {
	return useMutation({
		mutationFn: (payload: SubmitTestRequestDto): Promise<SubmitTestResponse> =>
			testSubmissionService.submitTest(payload),
		onSuccess: (_data, _variables) => {
			//TODO: Invalidate or update relevant queries here (releated to test results, user performance, etc.)
		},
	});
};
