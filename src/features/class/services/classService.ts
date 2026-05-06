import { classApi } from "@/core/api/endpoints";
import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type {
	ClassDetail,
	ClassResponse,
	CreateClassPayload,
	UserSummary,
} from "../type";

export const createClass = async (
	data: CreateClassPayload,
): Promise<ApiResponse<unknown>> => {
	const response: ApiResponse<unknown> = await httpClient.post(
		`${classApi}`,
		data,
	);
	return response;
};

export const getClassByTeacherId = async (): Promise<
	ApiResponse<ClassResponse[]>
> => {
	const response: ApiResponse<ClassResponse[]> = await httpClient.get(
		`${classApi}`,
	);
	return response;
};

export const fetchClassDetail = async (
	classId: string,
): Promise<ClassDetail> => {
	const response: ApiResponse<ClassDetail> = await httpClient.get(
		`${classApi}/${classId}`,
	);
	return response.data;
};

export const fetchClassStudents = async (
	classId: string,
): Promise<UserSummary[]> => {
	const response: ApiResponse<UserSummary[]> = await httpClient.get(
		`${classApi}/${classId}/students`,
	);
	return response.data;
};
