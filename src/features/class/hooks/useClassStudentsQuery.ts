import { useQuery } from "@tanstack/react-query";
import { fetchClassStudents } from "../services/classService";

export const useClassStudentsQuery = (classId: string | undefined) => {
	return useQuery({
		queryKey: ["class-students", classId],
		queryFn: () => fetchClassStudents(classId as string),
		staleTime: 1000 * 60 * 5, // 5 minutes
		enabled: !!classId,
	});
};
