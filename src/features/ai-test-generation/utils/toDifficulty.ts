import type { Difficulty } from "@/shared/constants/questionOption";

const toDifficulty = (value?: string): Difficulty => {
	if (value === "Dễ" || value?.toLowerCase() === "easy") {
		return "Dễ";
	}

	if (value === "Khó" || value?.toLowerCase() === "hard") {
		return "Khó";
	}

	return "Trung bình";
};

export default toDifficulty;
