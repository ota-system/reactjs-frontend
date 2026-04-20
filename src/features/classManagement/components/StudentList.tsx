import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const students = [
	{
		name: "Nguyễn Văn A",
		email: "nva@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["grammar", "vocabulary"],
	},
	{
		name: "Trần Thị B",
		email: "ttb@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["listening", "pronunciation"],
	},
	{
		name: "Lê Văn C",
		email: "lvc@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["writing"],
	},
	{
		name: "Nguyễn Văn A",
		email: "nva@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["grammar", "vocabulary"],
	},
	{
		name: "Trần Thị B",
		email: "ttb@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["listening", "pronunciation"],
	},
	{
		name: "Lê Văn C",
		email: "lvc@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["writing"],
	},
	{
		name: "Nguyễn Văn A",
		email: "nva@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["grammar", "vocabulary"],
	},
	{
		name: "Trần Thị B",
		email: "ttb@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["listening", "pronunciation"],
	},
	{
		name: "Lê Văn C",
		email: "lvc@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["writing"],
	},
	{
		name: "Nguyễn Văn A",
		email: "nva@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["grammar", "vocabulary"],
	},
	{
		name: "Trần Thị B",
		email: "ttb@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["listening", "pronunciation"],
	},
	{
		name: "Lê Văn C",
		email: "lvc@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["writing"],
	},
	{
		name: "Nguyễn Văn A",
		email: "nva@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["grammar", "vocabulary"],
	},
	{
		name: "Trần Thị B",
		email: "ttb@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["listening", "pronunciation"],
	},
	{
		name: "Lê Văn C",
		email: "lvc@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["writing"],
	},
	{
		name: "Nguyễn Văn A",
		email: "nva@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["grammar", "vocabulary"],
	},
	{
		name: "Trần Thị B",
		email: "ttb@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["listening", "pronunciation"],
	},
	{
		name: "Lê Văn C",
		email: "lvc@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["writing"],
	},
	{
		name: "Nguyễn Văn A",
		email: "nva@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["grammar", "vocabulary"],
	},
	{
		name: "Trần Thị B",
		email: "ttb@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["listening", "pronunciation"],
	},
	{
		name: "Lê Văn C",
		email: "lvc@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["writing"],
	},
	{
		name: "Nguyễn Văn A",
		email: "nva@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["grammar", "vocabulary"],
	},
	{
		name: "Trần Thị B",
		email: "ttb@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["listening", "pronunciation"],
	},
	{
		name: "Lê Văn C",
		email: "lvc@student.com",
		exams: 0,
		avg: "-",
		weakPoints: ["writing"],
	},
];

export function StudentList() {
	return (
		<div className="rounded-xl border w-full bg-card p-6 shadow-sm flex flex-col h-[600px]">
			<div className="mb-6 flex-none">
				<h3 className="text-lg font-bold">Danh sách học sinh</h3>
				<p className="text-sm text-muted-foreground">
					Tổng số {students.length} học sinh trong lớp
				</p>
			</div>

			<div className="relative w-full overflow-auto flex-1 pr-2 scrollbar-thin">
				<Table>
					<TableHeader className="relative z-10">
						<TableRow className="hover:bg-transparent">
							<TableHead className="sticky top-0 bg-white w-[200px] shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
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
					2
					<TableBody>
						{students.map((s) => (
							<TableRow key={`${s.email}-${s.id}`}>
								<TableCell className="font-medium">{s.name}</TableCell>
								<TableCell className="text-muted-foreground">
									{s.email}
								</TableCell>
								<TableCell className="text-center">{s.exams}</TableCell>
								<TableCell className="text-center">{s.avg}</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-2">
										{s.weakPoints.map((point) => (
											<Badge
												key={point}
												variant="outline"
												className="font-normal rounded-md"
											>
												{point}
											</Badge>
										))}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
