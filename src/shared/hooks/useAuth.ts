import { useQuery } from "@tanstack/react-query";
import { tokenService } from "@/lib/tokens";
import { TEN_MINUTES } from "@/shared/constants/time";
import { getCurrentUserInformation } from "../services/userDetailService";
import { useAuthStore } from "../stores/useAuthStore";

export const useAuth = () => {
	const setUserInfo = useAuthStore((state) => state.setUserInfo);
	const clearUserInfo = useAuthStore((state) => state.clearUserInfo);

	return useQuery({
		queryKey: ["auth-user"],
		queryFn: async () => {
			try {
				const response = await getCurrentUserInformation();
				const userInfo = response.data;
				setUserInfo(userInfo);
				return userInfo;
			} catch (error) {
				tokenService.clearTokens();
				clearUserInfo();
				throw error;
			}
		},
		staleTime: TEN_MINUTES,
		retry: false,
		enabled: !!tokenService.getAccessToken(),
	});
};
