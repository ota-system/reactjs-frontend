import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/api/queryClient";
import type { TestDetail } from "@/features/participation/types";
import type { TestInformationValues } from "@/shared/interfaces/TestInformation";
import type { ApiResponse, HttpError } from "@/shared/type";
import { updateTestInfo } from "../services/testService";

type UpdateTestInfoPayload = {
	testId: string;
	testInformation: TestInformationValues;
};

export const useUpdateTestInfoMutation = () => {
	return useMutation<ApiResponse<TestDetail>, HttpError, UpdateTestInfoPayload>(
		{
			mutationFn: ({ testId, testInformation }: UpdateTestInfoPayload) =>
				updateTestInfo(testId, testInformation),
			onSuccess: (_data, variables) => {
				queryClient.invalidateQueries({
					queryKey: ["class-test-review", variables.testId],
				});
			},
		},
	);
};
