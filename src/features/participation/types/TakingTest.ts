export interface ExamInfo {
	id: string;
	testName: string;
	duration: number;
	startedTime: string;
}

export interface ExamInfoMeta {
	totalQuestions: number;
}

export interface Choice {
	id: string;
	answer: string;
}

export interface ExamQuestion {
	id: string;
	question: string;
	type: "MULTIPLE_CHOICE" | "FILL_IN_THE_BLANK";
	level: string;
	choices: Choice[];
}

export interface ExamQuestionsMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}
