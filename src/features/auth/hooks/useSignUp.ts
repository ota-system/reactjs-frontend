import { toast } from "@/lib/toast";
import { signUp } from "../services/authService";
import useAuthStore from "../stores/authStore";
import type { SignUpPayload } from "../type";

const useSignUp = () => {
	const { setLoading } = useAuthStore();

	const onSubmit = async (payload: SignUpPayload) => {
		setLoading(true);
		try {
			const { accessToken, refreshToken } = await signUp(payload);
			return { accessToken, refreshToken };
		} catch (error) {
			toast.error((error as Error).message);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return { onSubmit };
};

export default useSignUp;
