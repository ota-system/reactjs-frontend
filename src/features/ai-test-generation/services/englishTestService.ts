import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse } from "@/shared/type";
import type { EnglishTest } from "../types/EnglishTest";

const englishTestService = {
	saveTest: async (testData: EnglishTest): Promise<ApiResponse<[]>> => {
		const response = await httpClient.post("/api/v1/english-tests", {
			...testData,
		});
		return response as ApiResponse<[]>;
	},
};

export default englishTestService;
