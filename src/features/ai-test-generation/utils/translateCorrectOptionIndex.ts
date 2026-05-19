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
	choices: Choice[] = [],
): number => {
	const [c0, c1, c2, c3] = choices;
	const options = [
		{ id: c0?.id, index: 0 },
		{ id: c1?.id, index: 1 },
		{ id: c2?.id, index: 2 },
		{ id: c3?.id, index: 3 },
	];

	const match = options.find(
		(opt) => answer === opt.index.toString() || isChoiceId(answer, opt.id),
	);

	if (match) {
		return match.index;
	}

	console.warn(`Invalid correct answer: ${answer}.`);
	return 0;
};

export default translateCorrectOptionIndex;
