export interface AnswerDto {
	questionId: string;
	optionId?: string;
	answer?: string;
}

export interface SubmitTestRequestDto {
	testId: string;
	answers: AnswerDto[];
}

export interface SubmitTestResult {
	score: number;
	correctRate: number;
	subject: string;
	correctQuestions: number;
	totalQuestions: number;
}

export interface SubmitTestResponse {
	data: SubmitTestResult;
	message: string;
}

export type TestSummary = {
	id: string;
	testName: string;
	startedTime: string;
	duration: number;
	totalQuestions: number;
	antiCheating: boolean;
	topic: string;
	createdAt: string;
};

export type TestDetail = TestSummary;
