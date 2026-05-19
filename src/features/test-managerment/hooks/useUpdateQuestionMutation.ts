import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/api/queryClient";
import type { GeneratedQuestionUI } from "@/features/ai-test-generation/utils/mapGeneratedQuestionToUI";
import type { ApiResponse, HttpError } from "@/shared/type";
import { updateQuestion } from "../services/testService";

type UpdateQuestionPayload = {
	testId: string;
	questionId: string;
	question: GeneratedQuestionUI;
};

export const useUpdateQuestionMutation = () => {
	return useMutation<ApiResponse<unknown>, HttpError, UpdateQuestionPayload>({
		mutationFn: ({ testId, questionId, question }: UpdateQuestionPayload) =>
			updateQuestion(testId, questionId, question),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["class-test-review", variables.testId],
			});
		},
	});
};
