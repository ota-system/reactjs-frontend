import { Award, CheckCircle, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Legend,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ClassResponse } from "@/features/class/type";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { truncate } from "@/shared/utils/stringUtils";
import { CustomTooltip } from "../components/CustomeRechartTooltip";
import { EmptyState } from "../components/EmptyState";
import { ResultStatCard } from "../components/ResultStatCard";
import { useClassAnalyticsQuery } from "../hooks/useClassAnalyticsQuery";
import { useStudentClassQuery } from "../hooks/useStudentClassQuery";

const COLORS = {
	myScore: "#6366f1",
	classAvg: "#f59e0b",
	classMax: "#10b981",
	classMin: "#f43f5e",
};

const renderDot = (props: any) => {
	const { cx, cy, payload } = props;
	if (payload.myScore === null) {
		return null;
	}
	return (
		<circle
			cx={cx}
			cy={cy}
			r={5}
			fill={COLORS.myScore}
			strokeWidth={2}
			stroke="#fff"
		/>
	);
};

const MyAnalytics = () => {
	const studentId = useAuthStore((s) => s.userInfo?.id);
	const { data: classData, isLoading: classLoading } = useStudentClassQuery();

	const classes: ClassResponse[] = classData?.data ?? [];
	const [selectedClassId, setSelectedClassId] = useState<string>("");

	const effectiveClassId = selectedClassId || classes[0]?.id || "";

	const { data: analytics = [], isLoading: analyticsLoading } =
		useClassAnalyticsQuery(studentId, effectiveClassId || undefined);

	const chartData = useMemo(
		() =>
			analytics.map((d) => ({
				...d,
				testName: truncate(d.testName, 14),
			})),
		[analytics],
	);

	const stats = useMemo(() => {
		if (!analytics.length) {
			return { myAvg: null, classAvg: null, vsClass: null, myBest: null };
		}
		const completedTests = analytics.filter((d) => d.myScore !== null);
		if (!completedTests.length) {
			return { myAvg: null, classAvg: null, vsClass: null, myBest: null };
		}

		const mySum = completedTests.reduce((s, d) => s + d.myScore, 0);
		const classSum = completedTests.reduce((s, d) => s + d.classAvgScore, 0);

		const myAvg = mySum / completedTests.length;
		const classAvg = classSum / completedTests.length;

		return {
			myAvg,
			classAvg,
			vsClass: myAvg - classAvg,
			myBest: Math.max(...completedTests.map((d) => d.myScore)),
		};
	}, [analytics]);

	let classSelectorContent = null;
	if (classLoading) {
		classSelectorContent = (
			<div className="h-10 w-64 rounded-lg bg-muted animate-pulse" />
		);
	} else if (classes.length === 0) {
		classSelectorContent = (
			<p className="text-sm text-muted-foreground">
				Bạn chưa tham gia lớp học nào.
			</p>
		);
	} else {
		classSelectorContent = (
			<select
				value={effectiveClassId}
				onChange={(e) => setSelectedClassId(e.target.value)}
				className="h-10 rounded-lg border bg-background px-3 pr-8 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 cursor-pointer min-w-[240px]"
			>
				{classes.map((cls) => (
					<option key={cls.id} value={cls.id}>
						{cls.name}
					</option>
				))}
			</select>
		);
	}

	let chartContent = null;
	if (analyticsLoading) {
		chartContent = (
			<div className="h-[350px] rounded-xl bg-muted animate-pulse" />
		);
	} else if (!effectiveClassId) {
		chartContent = (
			<EmptyState message="Hãy chọn một lớp học để xem phân tích." />
		);
	} else if (analytics.length === 0) {
		chartContent = (
			<EmptyState message="Bạn chưa có bài thi nào trong lớp này." />
		);
	} else {
		chartContent = (
			<ResponsiveContainer width="100%" height={350}>
				<ComposedChart
					data={chartData}
					margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
				>
					<CartesianGrid
						vertical={false}
						strokeDasharray="3 3"
						stroke="hsl(var(--border))"
					/>
					<XAxis
						dataKey="testName"
						tickLine={false}
						axisLine={false}
						tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
						tickMargin={10}
					/>
					<YAxis
						tickLine={false}
						axisLine={false}
						tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
						domain={[0, 10]}
						tickCount={6}
						width={32}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />

					<Bar
						dataKey="classAvgScore"
						name="Điểm TB lớp"
						fill={COLORS.classAvg}
						radius={[4, 4, 0, 0]}
						barSize={44}
						opacity={0.35}
					/>
					<Line
						type="monotone"
						dataKey="myScore"
						name="Điểm của bạn"
						stroke={COLORS.myScore}
						strokeWidth={3}
						dot={renderDot}
						activeDot={{
							r: 8,
							stroke: COLORS.myScore,
							strokeWidth: 2,
							fill: "#fff",
						}}
					/>
					<Line
						type="monotone"
						dataKey="classMaxScore"
						name="Điểm cao nhất lớp"
						stroke={COLORS.classMax}
						strokeWidth={2}
						strokeDasharray="5 4"
						dot={false}
					/>
					<Line
						type="monotone"
						dataKey="classMinScore"
						name="Điểm thấp nhất lớp"
						stroke={COLORS.classMin}
						strokeWidth={2}
						strokeDasharray="5 4"
						dot={false}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		);
	}

	return (
		<div className="p-6 space-y-6 min-h-screen">
			<div>
				<h1 className="text-2xl font-bold">Phân tích điểm số</h1>
				<p className="text-muted-foreground text-sm">
					Theo dõi tiến độ học tập và cải thiện điểm yếu
				</p>
			</div>

			<Card className="shadow-sm">
				<CardHeader className="pb-3 pt-5 px-5">
					<p className="text-sm font-semibold">Chọn lớp học</p>
					<p className="text-xs text-muted-foreground">
						So sánh kết quả của bạn với mặt bằng chung lớp học
					</p>
				</CardHeader>
				<CardContent className="px-5 pb-5">{classSelectorContent}</CardContent>
			</Card>

			{effectiveClassId && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ResultStatCard
						title="Số bài thi"
						value={analytics.length?.toString() ?? "—"}
						icon={<CheckCircle className="text-blue-500" />}
					/>
					<ResultStatCard
						title="Điểm TB của bạn"
						value={stats.myAvg?.toFixed(1) ?? "—"}
						icon={<Award className="text-yellow-500" />}
					/>
					<ResultStatCard
						title="Điểm TB lớp"
						value={stats.classAvg?.toFixed(1) ?? "—"}
						icon={<TrendingUp className="text-green-500" />}
					/>
					<ResultStatCard
						title="So với lớp"
						value={
							stats.vsClass !== null
								? `${stats.vsClass >= 0 ? "+" : ""}${stats.vsClass.toFixed(1)}`
								: "—"
						}
						icon={<TrendingDown className="text-purple-500" />}
					/>
				</div>
			)}

			<Card className="shadow-sm">
				<CardHeader className="pb-0 pt-5 px-5">
					<p className="text-base font-semibold">Kết quả học tập</p>
					<p className="text-xs text-muted-foreground">
						Biểu đồ so sánh điểm cá nhân và các mốc điểm của lớp
					</p>
				</CardHeader>
				<CardContent className="px-5 pb-6 pt-4">{chartContent}</CardContent>
			</Card>
		</div>
	);
};

export default MyAnalytics;
