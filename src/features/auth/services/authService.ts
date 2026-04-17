import { tokenService } from "@/lib/tokens";
import { httpClient } from "../../../core/api/httpClient.api";
import type { ApiResponse } from "../../../shared/type";
import type { LoginResponse, SignUpPayload } from "../type";

export const signUp = async (payload: SignUpPayload) => {
	const response: ApiResponse<LoginResponse> = await httpClient.post(
		"/api/v1/auth/sign-up",
		payload,
	);
	return response;
};

export const verifyToken = async (token: string) => {
	const response: ApiResponse<LoginResponse> = await httpClient.post(
		"/api/v1/auth/verify-token",
		{ token },
	);
	return response;
};

export const signOut = async () => {
	const refreshToken = tokenService.getRefreshToken();
	if (!refreshToken) {
		throw new Error("No refresh token found"); // For development purposes
	}
	tokenService.clearTokens();
	const response: ApiResponse<null> = await httpClient.post(
		"/api/v1/auth/sign-out",
		{ refreshToken },
	);
	return response;
};
