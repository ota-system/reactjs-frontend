import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { DETAILED_RESULT_COMMON_CLASSES } from "../constants/detailedResultStyles";
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
			<div
				className={cn(
					DETAILED_RESULT_COMMON_CLASSES.SIDEBAR_CONTAINER,
					"space-y-3",
				)}
			>
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
