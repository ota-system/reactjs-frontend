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
	resultId: string;
	score: number;
	correctRate: number;
	subject: string;
	correctQuestions: number;
	totalQuestions: number;
	fraud: Array<{
		type: FraudType;
		times: number;
	}>;
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
	hasAttempted: boolean;
	timesUp: boolean;
};

export type TestDetail = TestSummary;

import type { fraudTypes } from "../constants/fraudType";

export type FraudType = (typeof fraudTypes)[keyof typeof fraudTypes];
