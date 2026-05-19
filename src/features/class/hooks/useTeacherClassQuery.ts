import { useQuery } from "@tanstack/react-query";
import { getClassByTeacherId } from "../services/classService";

export const useTeacherClassQuery = () => {
	return useQuery({
		queryKey: ["teacher-class"],
		queryFn: getClassByTeacherId,
	});
};
