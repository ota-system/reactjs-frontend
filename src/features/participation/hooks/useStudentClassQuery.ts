import { useQuery } from "@tanstack/react-query";
import { getStudentClasses } from "../services/classService";

export const useStudentClassQuery = (page = 1, limit = 10) => {
	return useQuery({
		queryKey: ["student-classes", page, limit],
		queryFn: () => getStudentClasses(page, limit),
	});
};
