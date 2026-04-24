import { tokenService } from "@/lib/tokens";
import { httpClient } from "../../../core/api/httpClient.api";
import type { ApiResponse } from "../../../shared/type";
import type { LoginResponse, SignInPayload, SignUpPayload } from "../type";

export const signUp = async (payload: SignUpPayload) => {
	const response: ApiResponse<LoginResponse> = await httpClient.post(
		"/api/v1/auth/sign-up",
		payload,
	);
	return response;
};

export const verifyToken = async (
	token: string,
): Promise<ApiResponse<LoginResponse>> => {
	const response: ApiResponse<LoginResponse> = await httpClient.post(
		"/api/v1/auth/verify-token",
		{ token },
	);
	return response;
};

export const signOut = async () => {
	const refreshToken = tokenService.getRefreshToken();

	try {
		if (!refreshToken) {
			return {
				message: "Đã đăng xuất thành công",
				data: null,
			};
		}

		const response: ApiResponse<null> = await httpClient.post(
			"/api/v1/auth/sign-out",
			{ refreshToken },
		);
		return response;
	} finally {
		tokenService.clearTokens();
	}
};

export const signIn = async (payload: SignInPayload) => {
	const response: ApiResponse<LoginResponse> = await httpClient.post(
		"/api/v1/auth/login",
		payload,
	);
	return response;
};

export const signInWithGoogle = async (payload: {
	authCode: string;
	uri: string;
}) => {
	const response: ApiResponse<LoginResponse> = await httpClient.post(
		"/api/v1/auth/google",
		payload,
	);
	return response;
};

export const updateRole = async (role: string) => {
	const response: ApiResponse<any> = await httpClient.patch(
		"/api/v1/users/role",
		{ role },
	);
	return response;
};
