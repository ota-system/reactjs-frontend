import { httpClient } from "../../../core/api/httpClient.api";
import type { ApiResponse } from "../../../shared/type";
import type { SignUpPayload, SignUpResponse } from "../type";

export const signUp = async (payload: SignUpPayload) => {
	const response: ApiResponse<SignUpResponse> = await httpClient.post(
		"/api/v1/sign-up",
		payload,
	);
	return response.data;
};
