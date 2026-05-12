const translateCorrectOptionIndex = (answer: string): number => {
	switch (answer) {
		case "0":
			return 0;
		case "1":
			return 1;
		case "2":
			return 2;
		case "3":
			return 3;
		default:
			return 0;
	}
};

export default translateCorrectOptionIndex;
