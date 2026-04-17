import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/authService";

export const useSignInMutation = () => {
	return useMutation({
		mutationFn: signIn,
	});
};
