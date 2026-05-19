import type { GeneratedQuestionUI } from "../utils/mapGeneratedQuestionToUI";
import type { TestInformationValues } from "./TestInformation";

export interface DraftSnapshot {
	prompt: string;
	subject: string;
	questions: GeneratedQuestionUI[];
	testInformation: TestInformationValues;
	file?: File | null;
	mode: "text" | "pdf";
}

export interface GeneratedInputSnapshot {
	prompt: string;
	subject: string;
	file?: File | null;
	mode: "text" | "pdf";
}
