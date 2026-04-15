import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
import type { SignUpPayload } from "../type";

const useSignUp = () => {
	const navigate = useNavigate();

	const onSubmit = async (payload: SignUpPayload) => {
		const { accessToken, refreshToken } = await signUp(payload);
		return { accessToken, refreshToken };
	};

	const onSuccess = async () => {
		navigate("/sign-up-success");
	};

	return { onSubmit, onSuccess };
};

export default useSignUp;
