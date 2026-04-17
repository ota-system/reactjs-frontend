import { useMutation } from "@tanstack/react-query";
import { signOut } from "../services/authService";

export const useSignOutMutation = () => {
	return useMutation({
		mutationFn: signOut,
	});
};
