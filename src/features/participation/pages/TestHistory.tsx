import { Award, CheckCircle, TrendingDown, TrendingUp } from "lucide-react";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { ResultStatCard } from "../components/ResultStatCard";
import { ResultsTable } from "../components/ResultsTable";
import {
	useOverallResultsQuery,
	useStudentResultsQuery,
} from "../hooks/useStudentResultsQuery";

const TestHistory = () => {
	const studentId = useAuthStore((s) => s.userInfo?.id);

	const { data: results = [], isLoading: resultsLoading } =
		useStudentResultsQuery(studentId);
	const { data: overall, isLoading: overallLoading } =
		useOverallResultsQuery(studentId);

	const isLoading = resultsLoading || overallLoading;

	return (
		<div className="p-6 space-y-6 h-screen flex flex-col">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-bold">Kết quả bài thi</h1>
				<p className="text-muted-foreground text-sm">
					Xem lịch sử và thống kê bài thi của bạn
				</p>
			</div>

			<div className="w-full flex flex-col flex-1 min-h-0">
				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
					<ResultStatCard
						title="Tổng bài thi"
						value={isLoading ? "..." : String(overall?.totalTests ?? 0)}
						icon={<CheckCircle className="text-blue-500" />}
					/>
					<ResultStatCard
						title="Điểm TB"
						value={isLoading ? "..." : String(overall?.averageScore ?? 0)}
						icon={<Award className="text-yellow-500" />}
					/>
					<ResultStatCard
						title="Điểm cao nhất"
						value={isLoading ? "..." : String(overall?.highestScore ?? 0)}
						icon={<TrendingUp className="text-green-500" />}
					/>
					<ResultStatCard
						title="Điểm thấp nhất"
						value={isLoading ? "..." : String(overall?.lowestScore ?? 0)}
						icon={<TrendingDown className="text-purple-500" />}
					/>
				</div>

				{/* History Table */}
				<div className="flex flex-col flex-1 min-h-0">
					<ResultsTable data={results} />
				</div>
			</div>
		</div>
	);
};

export default TestHistory;
