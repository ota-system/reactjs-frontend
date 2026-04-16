import { useMutation } from "@tanstack/react-query";
import { verifyToken } from "../services/authService";

export const useVerifyMutation = () => {
	return useMutation({
		mutationFn: verifyToken,
	});
};
