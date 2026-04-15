import { tokenService } from "@/lib/tokens";
import { verifyToken } from "../services/authService";
import useAuthStore from "../stores/authStore";

const useVerify = () => {
	const { setLoading } = useAuthStore();

	const onVerify = async (token: string) => {
		setLoading(true);
		try {
			const { accessToken, refreshToken } = await verifyToken(token);
			tokenService.setTokens(accessToken, refreshToken);
		} finally {
			setLoading(false);
		}
	};

	return { onVerify };
};

export default useVerify;
