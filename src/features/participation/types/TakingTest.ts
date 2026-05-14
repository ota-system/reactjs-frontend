import type { QuestionTypeAPI } from "@/shared/constants/questionOption";

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
	type: QuestionTypeAPI;
	level: string;
	choices: Choice[];
	answer?: string;
}

export interface TestQuestionResponse {
	questions: TestQuestion[];
	totalQuestions: number;
}
