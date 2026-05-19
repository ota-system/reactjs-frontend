import type { StudentScoreItem } from "../types/dashboard";

interface StudentScoreTableProps {
	scores: StudentScoreItem[];
}

export default function StudentScoreTable({ scores }: StudentScoreTableProps) {
	return (
		<div>
			<p className="text-sm font-medium text-muted-foreground mb-3">
				Điểm học sinh
			</p>
			<div className="overflow-auto max-h-[240px] rounded-md border">
				<table className="w-full text-sm">
					<thead className="sticky top-0 bg-white">
						<tr className="border-b">
							<th className="text-left py-2 px-3 font-medium text-muted-foreground">
								Học sinh
							</th>
							<th className="text-right py-2 px-3 font-medium text-muted-foreground">
								Điểm ↓
							</th>
						</tr>
					</thead>
					<tbody>
						{scores.length === 0 ? (
							<tr>
								<td
									colSpan={2}
									className="text-center py-6 text-muted-foreground"
								>
									Chưa có kết quả
								</td>
							</tr>
						) : (
							scores.map((s, i) => (
								<tr
									// biome-ignore lint: suspicious/noArrayIndexKey
									key={`${s.student}-${i}`}
									className="border-b last:border-0 hover:bg-muted/30"
								>
									<td className="py-2 px-3">{s.student}</td>
									<td className="py-2 px-3 text-right font-medium">
										{s.score.toFixed(2)}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
