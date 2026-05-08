import { httpClient } from "@/core/api/httpClient.api";
import type { ApiResponse, PageMetaData } from "@/shared/type";
import type { TestStudentListItem, TestSummaryStats } from "../type";

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
