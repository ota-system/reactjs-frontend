import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole } from "../services/authService";

export const useUpdateRoleMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateRole,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth-user"] });
		},
	});
};
