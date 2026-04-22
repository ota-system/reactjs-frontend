import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { UserSummary } from "../services/classService";

//Because the student list now is not contain weekness,... so keep it simple.
interface StudentListProps {
	students: UserSummary[];
}

export function StudentList({ students }: StudentListProps) {
	return (
		<div className="rounded-xl w-full p-6 flex flex-col h-full border-0">
			<div className="mb-6 flex-none">
				<h3 className="text-lg font-bold">Danh sách học sinh</h3>
				<p className="text-sm text-muted-foreground">
					Tổng số {students?.length || 0} học sinh trong lớp
				</p>
			</div>

			<div className="relative w-full overflow-auto flex-1 pr-2 scrollbar-thin">
				<Table>
					<TableHeader className="relative z-10">
						<TableRow className="hover:bg-transparent">
							<TableHead className="sticky top-0 bg-white w-[250px] shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Họ tên
							</TableHead>
							<TableHead className="sticky top-0 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Email
							</TableHead>
							<TableHead className="sticky top-0 bg-white text-center shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Số bài thi
							</TableHead>
							<TableHead className="sticky top-0 bg-white text-center shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Điểm TB
							</TableHead>
							<TableHead className="sticky top-0 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
								Điểm yếu
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{!students || students.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="h-24 text-center text-muted-foreground"
								>
									Chưa có học sinh nào trong lớp.
								</TableCell>
							</TableRow>
						) : (
							students.map((s) => (
								<TableRow key={s.id} className="hover:bg-muted/50">
									<TableCell className="font-medium">{s.fullName}</TableCell>
									<TableCell className="text-muted-foreground">
										{s.email}
									</TableCell>
									<TableCell className="text-center">-</TableCell>
									<TableCell className="text-center">-</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-2">
											<span className="text-xs text-muted-foreground italic">
												Chưa có dữ liệu
											</span>
										</div>
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
