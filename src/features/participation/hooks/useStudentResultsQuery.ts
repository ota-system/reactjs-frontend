import { useQuery } from "@tanstack/react-query";
import {
	fetchOverallResults,
	fetchStudentResults,
} from "../services/studentService";

export const useStudentResultsQuery = (
	studentId: string | undefined,
	page = 1,
	limit = 10,
) => {
	return useQuery({
		queryKey: ["student-results", studentId, page, limit],
		queryFn: () => fetchStudentResults(studentId as string, page, limit),
		enabled: !!studentId,
	});
};

export const useOverallResultsQuery = (studentId: string | undefined) => {
	return useQuery({
		queryKey: ["overall-results", studentId],
		queryFn: () => fetchOverallResults(studentId as string),
		enabled: !!studentId,
	});
};
