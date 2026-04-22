const translateCorrectOptionIndex = (answer: string): number => {
	switch (answer) {
		case "A":
			return 0;
		case "B":
			return 1;
		case "C":
			return 2;
		case "D":
			return 3;
		default:
			return 0;
	}
};

export default translateCorrectOptionIndex;
