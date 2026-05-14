import {
	Bar,
	BarChart,
	CartesianGrid,
	ComposedChart,
	Label,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHART_COLORS } from "../constants/chartColors";
import type { ClassDashboardData } from "../types/dashboard";
import { padDistributionData } from "../utils/chartData";

interface ClassMetricsProps {
	data: ClassDashboardData;
}

export default function ClassMetrics({ data }: ClassMetricsProps) {
	const paddedGpaDistribution = padDistributionData(data.gpaDistribution);

	return (
		<Card>
			<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<CardTitle className="text-base">Tổng quan lớp học</CardTitle>
			</CardHeader>
			<CardContent className="p-6 pt-0">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Chart 1: GPA Distribution across all tests */}
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-3">
							Phân bố điểm trung bình của sinh viên
						</p>
						<ResponsiveContainer width="100%" height={220}>
							<BarChart
								data={paddedGpaDistribution}
								barCategoryGap={0}
								margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
							>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis dataKey="grade" tick={{ fontSize: 11 }}>
									<Label
										value="Điểm"
										offset={-10}
										position="insideBottom"
										fontSize={12}
									/>
								</XAxis>
								<YAxis allowDecimals={false} tick={{ fontSize: 11 }}>
									<Label
										value="Số học sinh"
										angle={-90}
										position="insideLeft"
										style={{ textAnchor: "middle" }}
										fontSize={12}
									/>
								</YAxis>
								<Tooltip />
								<Bar
									dataKey="count"
									name="Số học sinh"
									fill={CHART_COLORS.PRIMARY}
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* Chart 2: GPA across topics */}
					<div>
						<p className="text-sm font-medium text-muted-foreground mb-3">
							Phân bố điểm trung bình theo chủ đề
						</p>
						<ResponsiveContainer width="100%" height={220}>
							<ComposedChart
								data={data.gpaAcrossTopics}
								margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
							>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis dataKey="topic" tick={{ fontSize: 11 }}>
									<Label
										value="Chủ đề"
										offset={-10}
										position="insideBottom"
										fontSize={12}
									/>
								</XAxis>
								<YAxis domain={[0, 10]} tick={{ fontSize: 11 }}>
									<Label
										value="Điểm trung bình"
										angle={-90}
										position="insideLeft"
										style={{ textAnchor: "middle" }}
										fontSize={12}
									/>
								</YAxis>
								<Tooltip />
								<Bar
									dataKey="avg"
									name="Điểm trung bình"
									fill={CHART_COLORS.SECONDARY}
									radius={[4, 4, 0, 0]}
								/>
								{data.classTopicAvgScore > 0 && (
									<ReferenceLine
										y={data.classTopicAvgScore}
										stroke={CHART_COLORS.SUCCESS}
										strokeWidth={2}
										strokeDasharray="6 3"
										label={{
											value: `TB lớp: ${data.classTopicAvgScore}`,
											fill: CHART_COLORS.SUCCESS,
											fontSize: 11,
											position: "insideTopRight",
										}}
									/>
								)}
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
