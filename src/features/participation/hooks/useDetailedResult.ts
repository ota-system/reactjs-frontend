import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "@/lib/toast";
import { useOverallResultQuery } from "./useOverallResultQuery";
import { useQuestionDetailQuery } from "./useQuestionDetailQuery";

const useDetailedResult = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const {
		data: overall,
		isLoading: isLoadingOverall,
		isError: isOverallError,
		error: overallError,
	} = useOverallResultQuery(id);

	const questionResults = overall?.questionResults ?? [];
	const selectedQuestionId = searchParams.get("questionId") ?? undefined;

	useEffect(() => {
		if (questionResults.length > 0 && !selectedQuestionId) {
			setSearchParams(
				{ questionId: questionResults[0].questionId },
				{ replace: true },
			);
		}
	}, [questionResults, selectedQuestionId, setSearchParams]);

	const {
		data: questionDetail,
		isLoading: isLoadingQuestion,
		isError: isQuestionError,
		error: questionError,
	} = useQuestionDetailQuery(id, selectedQuestionId);

	useEffect(() => {
		if (isOverallError) {
			const err = overallError as unknown as { message?: string };
			toast.error(err?.message ?? "Không thể tải kết quả bài thi.");
		}
	}, [isOverallError, overallError]);

	useEffect(() => {
		if (isQuestionError) {
			const err = questionError as unknown as { message?: string };
			toast.error(err?.message ?? "Không thể tải chi tiết câu hỏi.");
		}
	}, [isQuestionError, questionError]);

	const handleSelectQuestion = (questionId: string) => {
		setSearchParams({ questionId }, { replace: true });
	};

	const handleBack = () => navigate(-1);

	return {
		overall,
		isLoadingOverall,
		questionResults,
		selectedQuestionId,
		questionDetail,
		isLoadingQuestion,
		handleSelectQuestion,
		handleBack,
	};
};

export default useDetailedResult;
