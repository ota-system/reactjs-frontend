import { useQuery } from "@tanstack/react-query";
import { getDetailedTestInfo } from "../services/testService";

export const useDetailedTestInfoQuery = (testId: string | undefined) => {
	return useQuery({
		queryKey: ["test-detail", testId],
		queryFn: () => getDetailedTestInfo(testId!),
		enabled: !!testId,
	});
};
