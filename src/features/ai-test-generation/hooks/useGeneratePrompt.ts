import { useMutation } from "@tanstack/react-query";
import {
	type GeneratedQuestion,
	type GenerateTestOptions,
	generateTest,
} from "@/shared/services/aiService";

interface GeneratePromptPayload extends GenerateTestOptions {
	prompt: string;
}

const useGeneratePrompt = () => {
	return useMutation<GeneratedQuestion[], Error, GeneratePromptPayload>({
		mutationKey: ["generateTest"],
		mutationFn: ({ prompt, ...options }) => generateTest(prompt, options),
	});
};

export default useGeneratePrompt;
