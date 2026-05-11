import { UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClassResponse } from "@/features/class/type";
import ClassItem from "@/shared/components/ClassCardItem";

type Props = {
	classes: ClassResponse[];
	onJoinClick: () => void;
};

export default function StudentClassList({ classes, onJoinClick }: Props) {
	return (
		<Card className="rounded-2xl size-full">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle className="text-lg">Lớp học của tôi</CardTitle>
					<p className="text-sm text-muted-foreground">
						Xem lớp học và làm bài thi
					</p>
				</div>

				<Button
					onClick={onJoinClick}
					className="flex items-center gap-2 px-4 py-6 cursor-pointer hover:bg-primary/90"
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
						{classes.map((cls) => (
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
	);
}
