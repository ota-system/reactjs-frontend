import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { ClassResponse } from "../type";

const classApi = "/api/v1/classes";

export const getClassByTeacherId = async (): Promise<
	ApiResponse<ClassResponse[]>
> => {
	const response: ApiResponse<ClassResponse[]> = await httpClient.get(
		`${classApi}`,
	);
	return response;
};
