import { httpClient } from "@/core/api/httpClient.api";
import type { ClassResponse } from "@/features/class/type";
import type { ApiResponse } from "@/shared/type";

const classApi = "/api/v1/classes";

export const getStudentClasses = async (): Promise<
	ApiResponse<ClassResponse[]>
> => {
	const response: ApiResponse<ClassResponse[]> = await httpClient.get(
		`${classApi}`,
	);
	return response;
};

export const joinClass = async (classId: string) => {
	const response = await httpClient.post(`${classApi}/${classId}/join`, {});
	return response;
};

export const previewClass = async (code: string) => {
	const response: ApiResponse<ClassResponse> = await httpClient.get(
		`${classApi}/code/${code}`,
	);
	return response;
};
