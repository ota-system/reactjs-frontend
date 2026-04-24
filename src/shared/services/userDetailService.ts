import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse, UserInfo } from "../type";

export const getCurrentUserInformation = async () => {
	const response: ApiResponse<UserInfo> =
		await httpClient.get("/api/v1/users/me");
	return response;
};
