import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/shared/type";
import englishTestService from "../services/englishTestService";
import type { EnglishTest } from "../types/EnglishTest";

const useEnglishTest = () => {
	return useMutation<ApiResponse<[]>, unknown, EnglishTest>({
		mutationKey: ["saveEnglishTest"],
		mutationFn: async (testData) => englishTestService.saveTest(testData),
	});
};

export default useEnglishTest;
