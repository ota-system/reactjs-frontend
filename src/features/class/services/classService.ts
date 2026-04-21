import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { CreateClassPayload } from "../type";

export const createClass = async (
	data: CreateClassPayload,
): Promise<ApiResponse<unknown>> => {
	const response: ApiResponse<unknown> = await httpClient.post(
		"/api/v1/classes",
		data,
	);
	return response;
};

export const getClassByTeacherId = async () => {
	const response = await httpClient.get(`/api/v1/classes`);
	return response;
};
