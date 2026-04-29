export type ExamSummary = {
	id: string;
	testName: string;
	startedTime: string;
	duration: number;
	totalQuestions: number;
	antiCheating: boolean;
	topic: string;
	createdAt: string;
};

export type ExamDetail = ExamSummary;
