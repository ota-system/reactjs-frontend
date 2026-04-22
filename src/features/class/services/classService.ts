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

export type UserSummary = {
	id: string;
	fullName: string;
	email: string;
	avatarUrl?: string;
};

export type ClassDetail = {
	id: string;
	name: string;
	subject: string;
	code: string;
	teacher: UserSummary;
	createdAt: string;
};

export const fetchClassDetail = async (
	classId: string,
): Promise<ClassDetail> => {
	const response: ApiResponse<ClassDetail> = await httpClient.get(
		`/api/v1/classes/${classId}`,
	);
	return response.data;
};

export const fetchClassStudents = async (
	classId: string,
): Promise<UserSummary[]> => {
	const response: ApiResponse<UserSummary[]> = await httpClient.get(
		`/api/v1/classes/${classId}/students`,
	);
	return response.data;
};
