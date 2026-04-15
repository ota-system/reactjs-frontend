import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
import useAuthStore from "../stores/authStore";
import type { SignUpPayload } from "../type";

const useSignUp = () => {
	const { setLoading } = useAuthStore();
	const navigate = useNavigate();

	const onSubmit = async (payload: SignUpPayload) => {
		setLoading(true);
		try {
			const { accessToken, refreshToken } = await signUp(payload);
			return { accessToken, refreshToken };
		} finally {
			setLoading(false);
		}
	};

	const onSuccess = async () => {
		navigate("/sign-up-success");
	};

	return { onSubmit, onSuccess };
};

export default useSignUp;
