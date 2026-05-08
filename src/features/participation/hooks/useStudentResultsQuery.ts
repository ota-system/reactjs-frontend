import { useQuery } from "@tanstack/react-query";
import {
	fetchOverallResults,
	fetchStudentResults,
} from "../services/studentService";

export const useStudentResultsQuery = (studentId: string | undefined) => {
	return useQuery({
		queryKey: ["student-results", studentId],
		queryFn: () => fetchStudentResults(studentId as string),
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
