interface Question {
	question: string;
	difficulty: string;
	questionType: string;
	options?: Array<string>;
	correctOptionIndex?: number;
	answer: string;
	explanation: string;
}

interface EnglishTest {
	testName: string;

	topicName: string;

	classId: string;

	startedTime: string;

	duration: number;

	questions: Question[];

	antiCheating: boolean;
}

export type { EnglishTest };
