import { useMutation } from "@tanstack/react-query";
import { updateRole } from "../services/authService";

export const useUpdateRoleMutation = () => {
	return useMutation({
		mutationFn: updateRole,
	});
};
