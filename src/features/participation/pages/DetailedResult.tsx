import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DetailedResultHeaderSection from "../components/DetailedResultHeaderSection";
import DetailedResultQuestionSection from "../components/DetailedResultQuestionSection";
import DetailedResultSidebarSection from "../components/DetailedResultSidebarSection";
import useDetailedResult from "../hooks/useDetailedResult";

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

				<DetailedResultHeaderSection
					isLoading={isLoadingOverall}
					overall={overall}
				/>
				<div className="h-4" />
				<DetailedResultQuestionSection
					isLoading={isLoadingQuestion}
					questionDetail={questionDetail}
				/>
			</div>

			<DetailedResultSidebarSection
				isLoading={isLoadingOverall}
				overall={overall}
				questionResults={questionResults}
				selectedQuestionId={selectedQuestionId}
				onSelectQuestion={handleSelectQuestion}
			/>
		</div>
	);
}
