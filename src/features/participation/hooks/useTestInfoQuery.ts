import { useQuery } from "@tanstack/react-query";
import { getTestInfo } from "../services/testService";

const useTestInfoQuery = (testId: string) => {
	return useQuery({
		queryKey: ["test-info", testId],
		queryFn: () => getTestInfo(testId),
		enabled: !!testId,
	});
};

export default useTestInfoQuery;
