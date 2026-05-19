import ClassListCard from "../components/ClassListCard";
import CreateClassDialog from "../components/CreateClassDialog";
import { useClassPage } from "../hooks/useClassPage";

const Class = () => {
	const { classes, isClassLoading, isCreateDialogOpen, setIsCreateDialogOpen } =
		useClassPage();

	return (
		<div className="p-4 md:p-8 space-y-6 w-full mx-auto h-screen overflow-hidden flex flex-col">
			{/* Header */}
			<div>
				<h1 className="text-2xl md:text-3xl font-semibold">Lớp học</h1>
				<p className="text-muted-foreground text-sm">Quản lý lớp học của bạn</p>
			</div>

			<div className="flex-1 min-h-0">
				<ClassListCard
					classes={classes}
					isLoading={isClassLoading}
					onCreateClick={() => setIsCreateDialogOpen(true)}
				/>
			</div>

			<CreateClassDialog
				open={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
			/>
		</div>
	);
};

export default Class;
