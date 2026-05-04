import { useQueryClient } from "@tanstack/react-query";
import ClassManagementToggle from "@/shared/components/ClassManagementToggle";
import { fetchClassStudents } from "../services/classService";

// import { fetchClassExams } from "../services/class.api"; // For when exams API is ready

type Props = {
	classId: string;
};

const ManagementToggle = ({ classId }: Props) => {
	const queryClient = useQueryClient();

	// prefetch incuming
	const prefetchExams = () => {
		// queryClient.prefetchQuery({
		// 	queryKey: ['class-exams', classId],
		// 	queryFn: () => fetchClassExams(classId),
		// });
	};

	const prefetchStudents = () => {
		queryClient.prefetchQuery({
			queryKey: ["class-students", classId],
			queryFn: () => fetchClassStudents(classId),
		});
	};

	return (
		<ClassManagementToggle
			classId={classId}
			basePath="classes"
			onPrefetchExams={prefetchExams}
			onPrefetchStudents={prefetchStudents}
		/>
	);
};

export default ManagementToggle;
