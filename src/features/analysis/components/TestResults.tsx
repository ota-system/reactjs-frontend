import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ClassDashboardData, TestDashboardData } from "../types/dashboard";
import StudentScoreTable from "./StudentScoreTable";
import TestGradeChart from "./TestGradeChart";
import TestResultsHeader from "./TestResultsHeader";

interface TestResultsProps {
	classData: ClassDashboardData;
	testData: TestDashboardData | undefined;
	isTestLoading: boolean;
	selectedTestId: string | undefined;
	onTestChange: (val: string) => void;
}

export default function TestResults({
	classData,
	testData,
	isTestLoading,
	selectedTestId,
	onTestChange,
}: TestResultsProps) {
	const renderContent = () => {
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
	};

	return (
		<Card>
			<TestResultsHeader
				classData={classData}
				testData={testData}
				selectedTestId={selectedTestId}
				onTestChange={onTestChange}
			/>
			<CardContent className="p-6 pt-0">{renderContent()}</CardContent>
		</Card>
	);
}
