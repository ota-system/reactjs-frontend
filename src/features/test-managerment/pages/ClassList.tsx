import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassItem from "@/shared/components/ClassCardItem";
import { useTeacherClassQuery } from "../hooks/useTeacherClassQuery";
import type { ClassResponse } from "../type";

const ClassList = () => {
	const { data } = useTeacherClassQuery();
	let classListContent = null;
	if (data?.data && data.data.length > 0) {
		classListContent = data.data.map((cls: ClassResponse) => (
			<ClassItem
				key={cls.id}
				title={cls.name}
				teacher={"Lớp của bạn"}
				studentsCount={cls.studentCount}
				testsCount={cls.testCount}
				code={cls.code}
				href={`/test-management/classes/${cls.id}`}
			/>
		));
	} else {
		classListContent = (
			<p className="text-center text-muted-foreground py-4">
				Chưa có lớp học nào được tạo.
			</p>
		);
	}

	return (
		<Card className="rounded-2xl">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle className="text-lg">Lớp học của tôi</CardTitle>
					<p className="text-sm text-muted-foreground">
						Xem danh sách lớp học và quản lý bài thi của các lớp
					</p>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">{classListContent}</CardContent>
		</Card>
	);
};

export default ClassList;
