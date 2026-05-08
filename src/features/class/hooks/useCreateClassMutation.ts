import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/core/api/queryClient";
import { createClass } from "../services/classService";

export const useCreateClassMutation = () => {
	return useMutation({
		mutationFn: createClass,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["teacher-class"],
			});

			queryClient.invalidateQueries({
				queryKey: ["teacher-overview"],
			});
		},
	});
};
