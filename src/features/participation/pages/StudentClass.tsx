import { BookOpen, FileText, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClassResponse } from "@/features/class/type";
import ClassItem from "@/shared/components/ClassCardItem";
import ClassStatCard from "@/shared/components/ClassStatCard";
import JoinClassDialog from "../components/JoinClassDialog";
import { useClassStatsQuery } from "../hooks/useClassStatsQuery";
import { useStudentClassQuery } from "../hooks/useStudentClassQuery";

const StudentClass = () => {
	const [open, setOpen] = useState(false);
	const { data } = useStudentClassQuery();
	const { data: statsData } = useClassStatsQuery();

	const classes = data?.data || [];
	const stats = statsData?.data;

	return (
		<div className="p-4 md:p-8 space-y-6 w-full mx-auto">
			<div>
				<h1 className="text-2xl md:text-3xl font-semibold">Lớp học</h1>
				<p className="text-muted-foreground text-sm">
					Theo dõi tiến độ học tập của bạn
				</p>
			</div>

			{/* Stats */}
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

			<Card className="rounded-2xl">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle className="text-lg">Lớp học của tôi</CardTitle>
						<p className="text-sm text-muted-foreground">
							Xem lớp học và làm bài thi
						</p>
					</div>

					<Button
						onClick={() => setOpen(true)}
						className="flex items-center gap-2 px-4 py-6 cursor-pointer  hover:bg-primary/90"
					>
						<UserPlus size={16} /> Tham gia lớp
					</Button>
				</CardHeader>

				<CardContent>
					{classes.length === 0 ? (
						<div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
							<div className="size-16 flex items-center justify-center rounded-full bg-muted">
								<Users className="size-6 text-muted-foreground" />
							</div>

							<div>
								<p className="font-medium">Chưa có lớp học nào</p>
								<p className="text-sm text-muted-foreground">
									Tham gia lớp học bằng mã mời từ giáo viên
								</p>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							{classes.map((cls: ClassResponse) => (
								<ClassItem
									key={cls.id}
									title={cls.name}
									teacher={cls.teacher?.fullName ?? "N/A"}
									studentsCount={cls.studentCount}
									testsCount={cls.testCount}
									code={cls.code}
									href={`/my-classes/${cls.id}/tests`}
								/>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			<JoinClassDialog open={open} onOpenChange={setOpen} />
		</div>
	);
};

export default StudentClass;
