import type { GeneratedQuestionUI } from "../utils/mapGeneratedQuestionToUI";
import type { TestInformationValues } from "./TestInformation";

export interface DraftSnapshot {
	prompt: string;
	subject: string;
	questions: GeneratedQuestionUI[];
	testInformation: TestInformationValues;
}

export interface GeneratedInputSnapshot {
	prompt: string;
	subject: string;
}
