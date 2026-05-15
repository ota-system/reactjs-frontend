import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/api/queryClient";
import type { ApiResponse, HttpError } from "@/shared/type";
import { deleteQuestion } from "../services/testService";

type DeleteQuestionPayload = {
	testId: string;
	questionId: string;
};

export const useDeleteQuestionMutation = () => {
	return useMutation<ApiResponse<null>, HttpError, DeleteQuestionPayload>({
		mutationFn: ({ testId, questionId }: DeleteQuestionPayload) =>
			deleteQuestion(testId, questionId),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["class-test-review", variables.testId],
			});
		},
	});
};
