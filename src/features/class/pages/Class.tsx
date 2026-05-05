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
					value={isLoading ? 0 : data?.data.length || 0}
					description="Lớp bạn quản lý"
					icon={Users}
				/>
				<ClassStatCard
					title="Bài thi"
					value={4}
					description="Bài thi đã tạo"
					icon={FileText}
				/>
				<ClassStatCard
					title="Học sinh"
					value={5}
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
						className="flex items-center gap-2 px-4 py-6 cursor-pointer hover:bg-gray-500"
					>
						<Plus size={16} /> Tạo lớp
					</Button>
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
							href={`/classes/${cls.id}/tests`}
						/>
					))}
				</CardContent>
			</Card>

			{/* Popup (Dialog) */}
			<CreateClassDialog open={open} onOpenChange={setOpen} />
		</div>
	);
};

export default Class;
