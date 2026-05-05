import { useQuery } from "@tanstack/react-query";
import { fetchTestStudents } from "../services/testService";

export const useTestStudentsQuery = (testId: string, page: number = 1) => {
	return useQuery({
		queryKey: ["test-students", testId, page],
		queryFn: () => fetchTestStudents(testId, page),
		enabled: !!testId,
	});
};
