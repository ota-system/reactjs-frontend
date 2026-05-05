import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassItem from "../components/ClassItem";
import { useTeacherClassQuery } from "../hooks/useTeacherClassQuery";
import type { ClassResponse } from "../type";

const ClassList = () => {
	const { data } = useTeacherClassQuery();

	return (
		<Card className="rounded-2xl">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle className="text-lg">Lớp học của tôi</CardTitle>
					<p className="text-sm text-muted-foreground">
						Xem danh sách lớp học và quản lý bài thì của các lớp
					</p>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{data?.data.map((cls: ClassResponse) => (
					<ClassItem
						key={cls.id}
						title={cls.name}
						teacher={"Lớp của bạn"}
						studentsCount={cls.studentCount}
						testsCount={cls.testCount}
						code={cls.code}
						id={cls.id}
						basePath="/test-management"
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default ClassList;
