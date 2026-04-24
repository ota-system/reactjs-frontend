import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/api/queryClient";
import { joinClass } from "../services/classService";

export const useJoinClassMutation = () => {
	return useMutation({
		mutationFn: joinClass,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["student-classes"] });
		},
	});
};
