import { useQuery } from "@tanstack/react-query";
import { FIVE_MINUTES } from "@/shared/constants/time";
import { fetchClassStudents } from "../services/classService";

export const useClassStudentsQuery = (classId: string | undefined) => {
	return useQuery({
		queryKey: ["class-students", classId],
		queryFn: () => fetchClassStudents(classId as string),
		staleTime: FIVE_MINUTES,
		enabled: !!classId,
	});
};
