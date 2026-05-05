import { useQuery } from "@tanstack/react-query";
import { fetchTestSummary } from "../services/testService";

export const useTestSummaryQuery = (testId: string) => {
	return useQuery({
		queryKey: ["test-summary", testId],
		queryFn: () => fetchTestSummary(testId),
		enabled: !!testId,
	});
};
