import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenService } from "@/lib/tokens";
import { getCurrentUserInformation } from "@/shared/services/userDetailService";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { updateRole } from "../services/authService";

export const useUpdateRoleMutation = () => {
	const queryClient = useQueryClient();
	const setUserInfo = useAuthStore.getState().setUserInfo;

	return useMutation({
		mutationFn: updateRole,
		onSuccess: async (result) => {
			const accessToken = result?.data.accessToken;
			const refreshToken = result?.data.refreshToken;

			if (accessToken && refreshToken) {
				tokenService.setTokens(accessToken, refreshToken);
			} else if (accessToken) {
				tokenService.setAccessToken(accessToken);
			}

			const response = await getCurrentUserInformation();
			const userInfo = response.data;
			setUserInfo(userInfo);
			queryClient.setQueryData(["auth-user"], userInfo);
		},
	});
};
