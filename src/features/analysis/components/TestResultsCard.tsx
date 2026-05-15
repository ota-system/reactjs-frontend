import { Card, CardContent } from "@/components/ui/card";
import type { ClassDashboardData, TestDashboardData } from "../types/dashboard";
import TestResultsBody from "./TestResultsBody";
import TestResultsHeader from "./TestResultsHeader";

interface TestResultsProps {
	classData: ClassDashboardData;
	testData: TestDashboardData | undefined;
	isTestLoading: boolean;
	selectedTestId: string | undefined;
	onTestChange: (val: string) => void;
}

export default function TestResultsCard({
	classData,
	testData,
	isTestLoading,
	selectedTestId,
	onTestChange,
}: TestResultsProps) {
	return (
		<Card>
			<TestResultsHeader
				classData={classData}
				testData={testData}
				selectedTestId={selectedTestId}
				onTestChange={onTestChange}
			/>
			<CardContent className="p-6 pt-0">
				<TestResultsBody testData={testData} isTestLoading={isTestLoading} />
			</CardContent>
		</Card>
	);
}
