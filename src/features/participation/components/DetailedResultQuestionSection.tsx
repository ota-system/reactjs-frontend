import { Skeleton } from "@/components/ui/skeleton";
import type { DetailedResultState } from "../types/detailedResult";
import QuestionDetailView from "./QuestionDetailView";

type Props = {
	isLoading: boolean;
	questionDetail: DetailedResultState["questionDetail"];
};

export default function DetailedResultQuestionSection({
	isLoading,
	questionDetail,
}: Props) {
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
