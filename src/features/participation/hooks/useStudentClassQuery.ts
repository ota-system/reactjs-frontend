import { useQuery } from "@tanstack/react-query";
import { getStudentClasses } from "../services/classService";

export const useStudentClassQuery = () => {
	return useQuery({
		queryKey: ["student-classes"],
		queryFn: getStudentClasses,
	});
};
