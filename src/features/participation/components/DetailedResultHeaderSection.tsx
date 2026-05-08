import { Skeleton } from "@/components/ui/skeleton";
import type { DetailedResultState } from "../types/detailedResult";
import ResultHeader from "./ResultHeader";

type Props = {
	isLoading: boolean;
	overall: DetailedResultState["overall"];
};

export default function DetailedResultHeaderSection({
	isLoading,
	overall,
}: Props) {
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
