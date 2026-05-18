import { useMutation } from "@tanstack/react-query";
import {
	type GeneratedQuestion,
	type GenerateTestOptions,
	generateTest,
	generateTestFromPdf,
} from "@/shared/services/aiService";

interface GeneratePromptPayload extends GenerateTestOptions {
	prompt: string;
	file?: File;
}

const useGeneratePrompt = () => {
	return useMutation<GeneratedQuestion[], Error, GeneratePromptPayload>({
		mutationKey: ["generateTest"],
		mutationFn: ({ prompt, file, ...options }) => {
			if (file) {
				return generateTestFromPdf(file, prompt, options);
			}
			return generateTest(prompt, options);
		},
	});
};

export default useGeneratePrompt;
