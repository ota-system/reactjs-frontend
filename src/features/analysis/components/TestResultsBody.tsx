import { Skeleton } from "@/components/ui/skeleton";
import type { TestDashboardData } from "../types/dashboard";
import StudentScoreTable from "./StudentScoreTable";
import TestGradeChart from "./TestGradeChart";

interface TestResultsBodyProps {
	testData: TestDashboardData | undefined;
	isTestLoading: boolean;
}

export default function TestResultsBody({
	testData,
	isTestLoading,
}: TestResultsBodyProps) {
	if (isTestLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Skeleton className="h-[220px] w-full" />
				<Skeleton className="h-[220px] w-full" />
			</div>
		);
	}

	if (!testData || (!testData.testId && testData.testGrades.length === 0)) {
		return (
			<div className="text-center py-12 text-muted-foreground">
				Không có dữ liệu bài thi
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<TestGradeChart testGrades={testData.testGrades} />
			<StudentScoreTable scores={testData.studentScores} />
		</div>
	);
}
