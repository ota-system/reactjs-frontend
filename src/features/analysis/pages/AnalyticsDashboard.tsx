import { Skeleton } from "@/components/ui/skeleton";
import { useTeacherClassQuery } from "../../class/hooks/useTeacherClassQuery";
import AnalyticsHeader from "../components/AnalyticsHeader";
import ClassMetrics from "../components/ClassMetrics";
import ClassSelection from "../components/ClassSelection";
import OverviewStats from "../components/OverviewStats";
import TestResultsCard from "../components/TestResultsCard";
import { useAnalyticsSelection } from "../hooks/useAnalyticsSelection";
import {
	useClassDashboardQuery,
	useTestDashboardQuery,
} from "../hooks/useDashboardQuery";

export default function AnalyticsDashboard() {
	const { data: classesData, isLoading: isClassesLoading } =
		useTeacherClassQuery();

	const {
		selectedClassId,
		selectedTestId,
		handleClassChange,
		handleTestChange,
	} = useAnalyticsSelection(classesData);

	const { data: classData, isLoading: isClassLoading } =
		useClassDashboardQuery(selectedClassId);
	const classDashboardData = classData?.data;

	const { data: testData, isLoading: isTestLoading } = useTestDashboardQuery(
		selectedClassId,
		selectedTestId,
	);
	const testDashboardData = testData?.data;

	if (isClassesLoading || (isClassLoading && !classDashboardData)) {
		return (
			<div className="p-6 space-y-4">
				<Skeleton className="h-8 w-48" />
				<div className="grid grid-cols-2 gap-4">
					<Skeleton className="h-64 w-full rounded-xl" />
					<Skeleton className="h-64 w-full rounded-xl" />
				</div>
				<Skeleton className="h-64 w-full rounded-xl" />
			</div>
		);
	}

	if (!classesData?.data || classesData.data.length === 0) {
		return (
			<div className="p-6 text-center py-12 text-muted-foreground">
				Bạn chưa có lớp học nào để xem phân tích.
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<AnalyticsHeader />

			<OverviewStats />

			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
				<ClassSelection
					classes={classesData.data}
					selectedClassId={selectedClassId}
					onClassChange={handleClassChange}
				/>
			</div>

			{classDashboardData ? (
				<>
					<ClassMetrics data={classDashboardData} />
					<TestResultsCard
						classData={classDashboardData}
						testData={testDashboardData}
						isTestLoading={isTestLoading}
						selectedTestId={selectedTestId}
						onTestChange={handleTestChange}
					/>
				</>
			) : (
				<div className="p-6 text-center py-12 text-muted-foreground">
					Không có dữ liệu
				</div>
			)}
		</div>
	);
}
