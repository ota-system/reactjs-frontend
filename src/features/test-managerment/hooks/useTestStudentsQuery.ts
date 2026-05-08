import { useQuery } from "@tanstack/react-query";
import {
	fetchTestStudents,
	type TestStudentsPaginatedResponse,
} from "../services/testService";

export const useTestStudentsQuery = (
	testId: string,
	page: number = 1,
	limit: number = 10,
) => {
	return useQuery<TestStudentsPaginatedResponse>({
		queryKey: ["test-students", testId, page, limit],
		queryFn: () => fetchTestStudents(testId, page, limit),
		enabled: !!testId,
		placeholderData: (prev) => prev,
	});
};
