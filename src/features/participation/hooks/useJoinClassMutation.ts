import { useMutation } from "@tanstack/react-query";
import { joinClass } from "../services/classService";

export const useJoinClassMutation = () => {
	return useMutation({
		mutationFn: joinClass,
	});
};
