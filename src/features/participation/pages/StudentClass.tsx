import JoinClassDialog from "../components/JoinClassDialog";
import StudentClassList from "../components/StudentClassList";
import StudentClassStats from "../components/StudentClassStats";
import { useStudentClassPage } from "../hooks/useStudentClassPage";

const StudentClass = () => {
	const { open, setOpen, classes, stats } = useStudentClassPage();

	return (
		<div className="p-4 md:p-8 space-y-6 w-full mx-auto h-screen overflow-y-auto flex flex-col">
			<div>
				<h1 className="text-2xl md:text-3xl font-semibold">Lớp học</h1>
				<p className="text-muted-foreground text-sm">
					Theo dõi tiến độ học tập của bạn
				</p>
			</div>

			<StudentClassStats stats={stats} />

			<div className="flex-1 min-h-0">
				<StudentClassList classes={classes} onJoinClick={() => setOpen(true)} />
			</div>

			<JoinClassDialog open={open} onOpenChange={setOpen} />
		</div>
	);
};

export default StudentClass;
