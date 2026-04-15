import { tokenService } from "@/lib/tokens";
import { verifyToken } from "../services/authService";

const useVerify = () => {
	const onVerify = async (token: string) => {
		const { accessToken, refreshToken } = await verifyToken(token);
		tokenService.setTokens(accessToken, refreshToken);
	};

	return { onVerify };
};

export default useVerify;
