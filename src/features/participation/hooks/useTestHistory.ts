import { useState } from "react";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import {
	useOverallResultsQuery,
	useStudentResultsQuery,
} from "./useStudentResultsQuery";

export const useTestHistory = () => {
	const studentId = useAuthStore((s) => s.userInfo?.id);
	const [page, setPage] = useState(1);
	const limit = 10;

	const { data: resultsResponse, isLoading: resultsLoading } =
		useStudentResultsQuery(studentId, page, limit);
	const { data: overall, isLoading: overallLoading } =
		useOverallResultsQuery(studentId);

	const results = resultsResponse?.data ?? [];

	const metadata = resultsResponse?.metadata;

	const isLoading = resultsLoading || overallLoading;

	return {
		page,
		setPage,
		results,
		metadata,
		overall,
		isLoading,
	};
};
