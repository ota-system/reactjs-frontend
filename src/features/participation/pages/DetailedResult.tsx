import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import QuestionDetailView from "../components/QuestionDetailView";
import QuestionNavigatorSidebar from "../components/QuestionNavigatorSidebar";
import ResultHeader from "../components/ResultHeader";
import useDetailedResult from "../hooks/useDetailedResult";

function HeaderSection({
	isLoading,
	overall,
}: {
	isLoading: boolean;
	overall: ReturnType<typeof useDetailedResult>["overall"];
}) {
	if (isLoading) {
		return (
			<div className="space-y-3">
				<Skeleton className="h-8 w-1/2" />
				<Skeleton className="h-4 w-1/3" />
				<Skeleton className="h-4 w-1/4" />
			</div>
		);
	}
	if (overall) {
		return <ResultHeader info={overall.testResultInfo} />;
	}
	return null;
}

function QuestionSection({
	isLoading,
	questionDetail,
}: {
	isLoading: boolean;
	questionDetail: ReturnType<typeof useDetailedResult>["questionDetail"];
}) {
	if (isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-32 w-full rounded-xl" />
				<div className="grid grid-cols-2 gap-4">
					{Array.from({ length: 4 }).map((_, i) => (
						// biome-ignore lint: skeleton placeholder index key
						<Skeleton key={i} className="h-16 w-full rounded-md" />
					))}
				</div>
			</div>
		);
	}
	if (questionDetail) {
		return <QuestionDetailView detail={questionDetail} />;
	}
	return null;
}

function SidebarSection({
	isLoading,
	overall,
	questionResults,
	selectedQuestionId,
	onSelectQuestion,
}: {
	isLoading: boolean;
	overall: ReturnType<typeof useDetailedResult>["overall"];
	questionResults: ReturnType<typeof useDetailedResult>["questionResults"];
	selectedQuestionId: ReturnType<
		typeof useDetailedResult
	>["selectedQuestionId"];
	onSelectQuestion: ReturnType<
		typeof useDetailedResult
	>["handleSelectQuestion"];
}) {
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

export default function DetailedResult() {
	const {
		overall,
		isLoadingOverall,
		questionResults,
		selectedQuestionId,
		questionDetail,
		isLoadingQuestion,
		handleSelectQuestion,
		handleBack,
	} = useDetailedResult();

	return (
		<div className="w-full h-full bg-background flex overflow-hidden">
			{/* Main Content */}
			<div className="flex-1 p-6 flex flex-col gap-5 overflow-auto">
				<div>
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={handleBack}
						className="cursor-pointer"
						aria-label="Go back"
					>
						<ArrowLeft className="size-4" />
					</Button>
				</div>

				<HeaderSection isLoading={isLoadingOverall} overall={overall} />
				<div className="h-4" />
				<QuestionSection
					isLoading={isLoadingQuestion}
					questionDetail={questionDetail}
				/>
			</div>

			<SidebarSection
				isLoading={isLoadingOverall}
				overall={overall}
				questionResults={questionResults}
				selectedQuestionId={selectedQuestionId}
				onSelectQuestion={handleSelectQuestion}
			/>
		</div>
	);
}
