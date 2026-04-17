import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle } from "../services/authService";

export const useSignInWithGoogleMutation = () => {
	return useMutation({
		mutationFn: signInWithGoogle,
	});
};
