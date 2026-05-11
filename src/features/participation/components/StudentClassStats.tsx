import { BookOpen, FileText, Users } from "lucide-react";
import type { StudentClassStatsResponse } from "@/features/class/type";
import ClassStatCard from "@/shared/components/ClassStatCard";

type Props = {
	stats: StudentClassStatsResponse | undefined;
};

export default function StudentClassStats({ stats }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<ClassStatCard
				title="Lớp học"
				value={stats?.totalClasses ?? "N/A"}
				description="Lớp bạn tham gia"
				icon={Users}
			/>
			<ClassStatCard
				title="Bài thi"
				value={stats?.totalTestResults ?? "N/A"}
				description="Bài thi đã làm"
				icon={FileText}
			/>
			<ClassStatCard
				title="Điểm TB"
				value={stats?.averageScore.toFixed(2) ?? "N/A"}
				description="Điểm trung bình"
				icon={BookOpen}
			/>
		</div>
	);
}
