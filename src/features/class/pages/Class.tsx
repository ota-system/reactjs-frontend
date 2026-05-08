import { BookOpen, FileText, Users } from "lucide-react";
import ClassStatCard from "@/shared/components/ClassStatCard";
import ClassListCard from "../components/ClassListCard";
import CreateClassDialog from "../components/CreateClassDialog";
import { useClassPage } from "../hooks/useClassPage";

const Class = () => {
	const {
		classes,
		isClassLoading,
		overview,
		isCreateDialogOpen,
		setIsCreateDialogOpen,
	} = useClassPage();

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
					value={overview?.totalClasses ?? "N/A"}
					description="Lớp bạn quản lý"
					icon={Users}
				/>
				<ClassStatCard
					title="Bài thi"
					value={overview?.totalTests ?? "N/A"}
					description="Bài thi đã tạo"
					icon={FileText}
				/>
				<ClassStatCard
					title="Học sinh"
					value={overview?.totalStudents ?? "N/A"}
					description="Tổng số học sinh"
					icon={BookOpen}
				/>
			</div>

			<ClassListCard
				classes={classes}
				isLoading={isClassLoading}
				onCreateClick={() => setIsCreateDialogOpen(true)}
			/>

			<CreateClassDialog
				open={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
			/>
		</div>
	);
};

export default Class;
