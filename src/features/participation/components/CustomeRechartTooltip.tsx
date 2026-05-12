import { COLORS } from "../types";

export function CustomTooltip({ active, payload }: any) {
	if (!active || !payload?.length) {
		return null;
	}

	const originalData = payload[0]?.payload;

	const rows = [
		{
			key: "myScore",
			label: "Điểm của bạn",
			color: COLORS.myScore,
			value:
				originalData?.myScore == null
					? "Bạn chưa làm bài"
					: Number(originalData.myScore).toFixed(1),
		},
		{
			key: "classAvgScore",
			label: "Điểm TB lớp",
			color: COLORS.classAvg,
			value: Number(originalData?.classAvgScore ?? 0).toFixed(1),
		},
		{
			key: "classMaxScore",
			label: "Điểm cao nhất lớp",
			color: COLORS.classMax,
			value: Number(originalData?.classMaxScore ?? 0).toFixed(1),
		},
		{
			key: "classMinScore",
			label: "Điểm thấp nhất lớp",
			color: COLORS.classMin,
			value: Number(originalData?.classMinScore ?? 0).toFixed(1),
		},
	];

	return (
		<div className="rounded-xl border bg-card/95 backdrop-blur shadow-lg p-3 text-sm min-w-[240px]">
			<p className="font-semibold mb-2">{originalData?.testName}</p>

			<div className="space-y-1">
				{rows.map((row) => (
					<div key={row.key} className="flex items-center gap-2">
						<span
							className="w-2.5 h-2.5 rounded-full shrink-0"
							style={{
								background: row.color,
							}}
						/>

						<span className="text-muted-foreground">{row.label}</span>

						<span className="ml-auto font-medium">{row.value}</span>
					</div>
				))}
			</div>
		</div>
	);
}
