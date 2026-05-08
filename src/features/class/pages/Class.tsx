import { BookOpen, FileText, Plus, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassItem from "@/shared/components/ClassCardItem";
import ClassStatCard from "@/shared/components/ClassStatCard";
import CreateClassDialog from "../components/CreateClassDialog";
import { useTeacherClassQuery } from "../hooks/useTeacherClassQuery";
import type { ClassResponse } from "../type";

const Class = () => {
	const [open, setOpen] = useState(false);
	const { data, isLoading } = useTeacherClassQuery();
	const totalClasses = isLoading ? 0 : data?.data.length || 0;
	const totalTests = 4;
	const totalStudents = 5;

	let classListContent = null;

	if (isLoading) {
		classListContent = (
			<p className="text-center py-4 text-muted-foreground">
				Đang tải danh sách lớp học...
			</p>
		);
	} else if (data?.data && data.data.length > 0) {
		classListContent = data.data.map((cls: ClassResponse) => (
			<ClassItem
				key={cls.id}
				title={cls.name}
				teacher={"Lớp của bạn"}
				studentsCount={cls.studentCount}
				testsCount={cls.testCount}
				code={cls.code}
				href={`/classes/${cls.id}/tests`}
			/>
		));
	} else {
		classListContent = (
			<div className="text-center py-8 text-muted-foreground">
				Bạn chưa quản lý lớp học nào. Hãy nhấn "Tạo lớp" để bắt đầu.
			</div>
		);
	}

	return (
		<div className="p-4 md:p-8 space-y-6 w-full mx-auto">
			{/* Header */}
			<div>
				<h1 className="text-2xl md:text-3xl font-semibold">Lớp học</h1>
				<p className="text-muted-foreground text-sm">Quản lý lớp học của bạn</p>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<ClassStatCard
					title="Lớp học"
					value={totalClasses}
					description="Lớp bạn quản lý"
					icon={Users}
				/>
				<ClassStatCard
					title="Bài thi"
					value={totalTests}
					description="Bài thi đã tạo"
					icon={FileText}
				/>
				<ClassStatCard
					title="Học sinh"
					value={totalStudents}
					description="Tổng số học sinh"
					icon={BookOpen}
				/>
			</div>

			{/* Class List */}
			<Card className="rounded-2xl">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle className="text-lg">Lớp học của tôi</CardTitle>
						<p className="text-sm text-muted-foreground">
							Quản lý lớp học và tạo bài thi
						</p>
					</div>

					<Button
						onClick={() => setOpen(true)}
						className="flex items-center gap-2 px-4 py-6 cursor-pointer hover:bg-primary/90"
					>
						<Plus size={16} /> Tạo lớp
					</Button>
				</CardHeader>

				<CardContent className="space-y-4">{classListContent}</CardContent>
			</Card>

			{/* Popup (Dialog) */}
			<CreateClassDialog open={open} onOpenChange={setOpen} />
		</div>
	);
};

export default Class;
