import {
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { CHART_COLORS } from "../constants/chartColors";
import type { GpaDistributionItem } from "../types/dashboard";
import { padDistributionData } from "../utils/chartData";

interface TestGradeChartProps {
	testGrades: GpaDistributionItem[];
}

export default function TestGradeChart({ testGrades }: TestGradeChartProps) {
	const paddedTestGrades = padDistributionData(testGrades);

	return (
		<div>
			<p className="text-sm font-medium text-muted-foreground mb-3">
				Phân bố điểm bài thi
			</p>
			<ResponsiveContainer width="100%" height={220}>
				<BarChart
					data={paddedTestGrades}
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
						stroke={CHART_COLORS.PRIMARY}
						strokeWidth={1}
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
