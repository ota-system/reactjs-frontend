import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { signOut } from "../services/authService";

export const useSignOutMutation = () => {
	const queryClient = useQueryClient();
	const clearUserInfo = useAuthStore((state) => state.clearUserInfo);

	return useMutation({
		mutationFn: signOut,
		onSettled: () => {
			clearUserInfo();
			queryClient.clear();
		},
	});
};
