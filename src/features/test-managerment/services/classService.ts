import { classApi } from "@/core/api/endpoints";
import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { ClassResponse } from "../type";

export const getClassByTeacherId = async (): Promise<
	ApiResponse<ClassResponse[]>
> => {
	const response: ApiResponse<ClassResponse[]> = await httpClient.get(
		`${classApi}`,
	);
	return response;
};
