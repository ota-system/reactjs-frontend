import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, HttpError } from "@/shared/type";
import { getTestInfo } from "../services/testService";
import type { TestInfo } from "../types/TakingTest";

const useTestInfoQuery = (testId: string) => {
	return useQuery<ApiResponse<TestInfo>, HttpError>({
		queryKey: ["test-info", testId],
		queryFn: () => getTestInfo(testId),
		enabled: !!testId,
	});
};

export default useTestInfoQuery;
