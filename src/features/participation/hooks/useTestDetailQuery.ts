import { useQuery } from "@tanstack/react-query";
import { getTestDetail } from "../services/testService";

export const useTestDetailQuery = (testId: string | undefined) => {
	return useQuery({
		queryKey: ["test-detail", testId],
		queryFn: () => getTestDetail(testId!),
		enabled: !!testId,
	});
};
