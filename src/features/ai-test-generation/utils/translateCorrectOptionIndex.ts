import type { Choice } from "@/features/participation/types/TakingTest";

const isChoiceId = (answer: string, choiceId: string | undefined): boolean => {
	if (!choiceId) {
		return false;
	}

	if (choiceId === answer) {
		return true;
	}

	return false;
};
const translateCorrectOptionIndex = (
	answer: string,
	choices?: Choice[],
): number => {
	if (answer === "0" || isChoiceId(answer, choices?.[0]?.id)) {
		return 0;
	} else if (answer === "1" || isChoiceId(answer, choices?.[1]?.id)) {
		return 1;
	} else if (answer === "2" || isChoiceId(answer, choices?.[2]?.id)) {
		return 2;
	} else if (answer === "3" || isChoiceId(answer, choices?.[3]?.id)) {
		return 3;
	} else {
		console.warn(`Invalid correct answer: ${answer}. Defaulting to index 0.`);
		return 0;
	}
};

export default translateCorrectOptionIndex;
