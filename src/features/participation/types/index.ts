export interface AnswerDto {
	questionId: string;
	optionId?: string;
	answer?: string;
}

export interface SubmitTestRequestDto {
	testId: string;
	answers: AnswerDto[];
}

export interface SubmitTestResponse {
	score: number;
	correctRate: number;
	subject: string;
	correctQuestions: number;
	totalQuestions: number;
}
