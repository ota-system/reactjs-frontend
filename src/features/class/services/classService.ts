import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { ClassResponse, CreateClassPayload } from "../type";

const baseApi = "/api/v1/classes";

export const createClass = async (
	data: CreateClassPayload,
): Promise<ApiResponse<unknown>> => {
	const response: ApiResponse<unknown> = await httpClient.post(
		`${baseApi}`,
		data,
	);
	return response;
};

export const getClassByTeacherId = async (): Promise<
	ApiResponse<ClassResponse[]>
> => {
	const response: ApiResponse<ClassResponse[]> = await httpClient.get(
		`${baseApi}`,
	);
	return response;
};
