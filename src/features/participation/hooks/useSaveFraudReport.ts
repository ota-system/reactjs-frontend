import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/api/queryClient";
import type { ApiResponse, HttpError } from "@/shared/type";
import { saveFraudReport } from "../services/testService";

export const useSaveFraudReport = () => {
	return useMutation<
		ApiResponse<null>,
		HttpError,
		{ testId: string; fraudType: string }
	>({
		mutationFn: (report) => saveFraudReport(report),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["fraud-reports"] });
		},
	});
};
