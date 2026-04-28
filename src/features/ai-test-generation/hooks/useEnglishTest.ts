import { useMutation } from "@tanstack/react-query";
import type { ApiResponse, ErrorResponse } from "@/shared/type";
import englishTestService from "../services/englishTestService";
import type { EnglishTest } from "../types/EnglishTest";

const useEnglishTest = () => {
	return useMutation<ApiResponse<[]>, ErrorResponse, EnglishTest>({
		mutationKey: ["saveEnglishTest"],
		mutationFn: async (testData) => englishTestService.saveTest(testData),
	});
};

export default useEnglishTest;
