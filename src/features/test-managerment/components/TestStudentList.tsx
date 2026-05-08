import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { TestStudentListItem } from "../type";

interface TestStudentListProps {
	students: TestStudentListItem[];
}

export function TestStudentList({ students }: TestStudentListProps) {
	return (
		<div className="rounded-xl size-full flex flex-col border-0">
			<div className="mb-6 flex-none">
				<h3 className="text-lg font-bold">Danh sách thí sinh</h3>
				<p className="text-sm text-muted-foreground">
					Danh sách tất cả các thí sinh đã tham gia bài thi và điểm
				</p>
			</div>

			<div className="relative w-full overflow-auto flex-1 pr-2 scrollbar-thin">
				<Table>
					<TableHeader className="relative z-10">
						<TableRow className="hover:bg-transparent">
							<TableHead className="sticky top-0 bg-white font-semibold text-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Họ và tên
							</TableHead>
							<TableHead className="sticky top-0 bg-white font-semibold text-foreground text-center shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Số lần sai phạm
							</TableHead>
							<TableHead className="sticky top-0 bg-white font-semibold text-foreground text-center shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Điểm
							</TableHead>
							<TableHead className="sticky top-0 bg-white font-semibold text-foreground text-center shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Tỷ lệ
							</TableHead>
							<TableHead className="sticky top-0 bg-white font-semibold text-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Thời gian
							</TableHead>
							<TableHead className="sticky top-0 bg-white font-semibold text-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Ngày thi
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{!students || students.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="h-24 text-center text-muted-foreground"
								>
									Chưa có thí sinh nào tham gia.
								</TableCell>
							</TableRow>
						) : (
							students.map((s) => (
								<TableRow key={s.id} className="hover:bg-muted/50 border-b-0">
									<TableCell className="font-medium py-4">
										{s.studentName}
									</TableCell>
									<TableCell className="text-center py-4">
										{s.violations > 0 ? (
											<span className="inline-flex items-center gap-1.5 text-[var(--warning-text-color,#f59e0b)] text-sm font-medium">
												<AlertTriangle className="size-4" />
												{s.violations} cảnh báo
											</span>
										) : (
											<span className="text-muted-foreground">-</span>
										)}
									</TableCell>
									<TableCell className="text-center py-4 font-medium">
										{s.score}/{s.totalScore}
									</TableCell>
									<TableCell className="text-center py-4">
										<Badge
											variant="secondary"
											className="bg-zinc-800 text-white hover:bg-zinc-700 px-2 rounded-md"
										>
											{s.percentage}%
										</Badge>
									</TableCell>
									<TableCell className="py-4 text-muted-foreground">
										<span className="inline-flex items-center gap-1.5">
											<Clock className="size-4" />
											{s.durationMinutes} phút
										</span>
									</TableCell>
									<TableCell className="py-4 text-muted-foreground font-medium">
										{s.submittedAt}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
