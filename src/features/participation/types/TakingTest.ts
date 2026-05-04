export interface TestInfo {
	id: string;
	testName: string;
	duration: number;
	startedTime: string;
	totalQuestions: number;
}

export interface Choice {
	id: string;
	answer: string;
}

export interface TestQuestion {
	id: string;
	question: string;
	type: "multiple_choice" | "fill_in_the_blank";
	level: string;
	choices: Choice[];
}

export interface TestQuestionResponse {
	questions: TestQuestion[];
	totalQuestions: number;
}
