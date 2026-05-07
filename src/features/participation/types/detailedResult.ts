export interface TestResultInfo {
	testResultId: string;
	testName: string;
	teacherName: string;
	completedAt: string;
	topic: string;
	totalQuestions: number;
	score: number;
	correctRate: number;
}

export interface QuestionResult {
	questionId: string;
	isCorrect: boolean | null;
}

export interface OverallResult {
	testResultInfo: TestResultInfo;
	questionResults: QuestionResult[];
}

export interface QuestionChoice {
	id: string;
	choice: string;
	isCorrect: boolean;
}

export interface QuestionDetail {
	id: string;
	question: string;
	type: "multiple_choice" | "fill_in_the_blank";
	choices: QuestionChoice[];
	answer: string | null;
	explanation: string | null;
	studentOptionId: string | null;
	studentAnswer: string | null;
	isCorrect: boolean | null;
}
