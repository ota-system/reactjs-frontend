import { Skeleton } from "@/components/ui/skeleton";
import type { DetailedResultState } from "../types/detailedResult";
import QuestionNavigatorSidebar from "./QuestionNavigatorSidebar";

type Props = {
	isLoading: boolean;
	overall: DetailedResultState["overall"];
	questionResults: DetailedResultState["questionResults"];
	selectedQuestionId: DetailedResultState["selectedQuestionId"];
	onSelectQuestion: DetailedResultState["handleSelectQuestion"];
};

export default function DetailedResultSidebarSection({
	isLoading,
	overall,
	questionResults,
	selectedQuestionId,
	onSelectQuestion,
}: Props) {
	if (isLoading) {
		return (
			<div className="w-72 border-l p-5 space-y-3">
				{Array.from({ length: 10 }).map((_, i) => (
					// biome-ignore lint: skeleton placeholder index key
					<Skeleton key={i} className="h-12 w-full rounded-lg" />
				))}
			</div>
		);
	}
	if (overall) {
		return (
			<QuestionNavigatorSidebar
				questionResults={questionResults}
				selectedQuestionId={selectedQuestionId}
				onSelectQuestion={onSelectQuestion}
				info={overall.testResultInfo}
			/>
		);
	}
	return null;
}
