import { useMutation } from "@tanstack/react-query";
import { selectRole } from "../services/authService";

export const useSelectRoleMutation = () => {
	return useMutation({
		mutationFn: selectRole,
	});
};
