import type { OptionItem } from "@/features/ai-test-generation/utils/mapGeneratedQuestionToUI";

const cleanQuestionOptions = (options: OptionItem[]) => {
	return options
		.map((option) => ({
			...option,
			value: option.value.trim(),
		}))
		.filter((option) => option.value !== "");
};

export default cleanQuestionOptions;
