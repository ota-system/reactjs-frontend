import { testApi } from "@/core/api/endpoints";
import { httpClient } from "@/core/api/httpClient.api";
import type {
	GeneratedQuestionUI,
	OptionItem,
} from "@/features/ai-test-generation/utils/mapGeneratedQuestionToUI";
import type { TestDetail } from "@/features/participation/types";
import type { TestInformationValues } from "@/shared/interfaces/TestInformation";
import type { ApiResponse, PageMetaData } from "@/shared/type";
import cleanQuestionOptions from "@/shared/utils/cleanQuestionOptions";
import {
	isMultipleChoiceUI,
	normalizeDifficultyToApi,
	normalizeQuestionTypeToApi,
} from "@/shared/utils/questionMapping";
import type { TestStudentListItem, TestSummaryStats } from "../type";
import { buildUpdateTestInfoPayload } from "../utils/buildUpdateTestInfoPayload";

export const fetchTestSummary = async (
	testId: string,
): Promise<TestSummaryStats> => {
	const response: ApiResponse<TestSummaryStats> = await httpClient.get(
		`/api/v1/tests/${testId}/summary`,
	);
	return response.data;
};

export type TestStudentsPaginatedResponse = {
	data: TestStudentListItem[];
	metadata: PageMetaData & { total: number };
};

export const fetchTestStudents = async (
	testId: string,
	page: number = 1,
	limit: number = 10,
): Promise<TestStudentsPaginatedResponse> => {
	const response = await httpClient.get<
		ApiResponse<TestStudentListItem[]> & {
			metadata: PageMetaData & { total: number };
		}
	>(`/api/v1/tests/${testId}/students?page=${page}&limit=${limit}`);
	return {
		data: response.data,
		metadata: response.metadata,
	};
};

type QuestionDto = {
	question: string;
	difficulty: string;
	options: { id: string; answer: string }[] | [];
	questionType: string;
	answer: string | undefined;
};

const mapOptionsToDto = (
	options: GeneratedQuestionUI["options"],
): QuestionDto["options"] =>
	options.map((option: OptionItem) => ({
		id: option.id,
		answer: option.value.trim(),
	}));

const buildQuestionPayload = (question: GeneratedQuestionUI): QuestionDto => {
	const isMultipleChoice = isMultipleChoiceUI(question.questionType as string);

	return {
		question: question.question.trim(),
		difficulty: normalizeDifficultyToApi(question.difficulty),
		questionType: normalizeQuestionTypeToApi(question.questionType),
		options: isMultipleChoice ? mapOptionsToDto(question.options) : [],
		answer: isMultipleChoice
			? question.options[question.correctOptionIndex]?.id
			: question.correctAnswer.trim(),
	};
};

export const updateQuestion = async (
	testId: string,
	questionId: string,
	question: GeneratedQuestionUI,
): Promise<ApiResponse<unknown>> => {
	const response = await httpClient.patch<ApiResponse<unknown>>(
		`${testApi}/${testId}/questions/${questionId}`,
		buildQuestionPayload({
			...question,
			options: cleanQuestionOptions(question.options),
		}),
	);

	return response;
};

export const deleteQuestion = async (
	testId: string,
	questionId: string,
): Promise<ApiResponse<null>> => {
	const response = await httpClient.delete<ApiResponse<null>>(
		`${testApi}/${testId}/questions/${questionId}`,
	);
	return response;
};

export const updateTestInfo = async (
	testId: string,
	testInformation: TestInformationValues,
): Promise<ApiResponse<TestDetail>> => {
	const response = await httpClient.patch<ApiResponse<TestDetail>>(
		`${testApi}/${testId}`,
		buildUpdateTestInfoPayload(testInformation),
	);

	return response;
};
