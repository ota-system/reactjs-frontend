import { BookOpen, FileText, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ClassStatCard from "@/shared/components/ClassStatCard";
import { useTeacherOverviewQuery } from "../../class/hooks/useTeacherOverviewQuery";

export default function OverviewStats() {
	const { data: overviewData, isLoading } = useTeacherOverviewQuery();
	const overview = overviewData?.data;

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-32 w-full rounded-2xl" />
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<ClassStatCard
				title="Lớp học"
				value={overview?.totalClasses ?? "0"}
				description="Lớp bạn quản lý"
				icon={Users}
			/>
			<ClassStatCard
				title="Bài thi"
				value={overview?.totalTests ?? "0"}
				description="Bài thi đã tạo"
				icon={FileText}
			/>
			<ClassStatCard
				title="Học sinh"
				value={overview?.totalStudents ?? "0"}
				description="Tổng số học sinh"
				icon={BookOpen}
			/>
		</div>
	);
}
