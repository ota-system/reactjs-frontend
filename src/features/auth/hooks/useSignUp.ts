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
		} finally {
			setLoading(false);
		}
	};

	return { onSubmit };
};

export default useSignUp;
