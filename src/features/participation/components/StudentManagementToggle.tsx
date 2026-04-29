import { useQueryClient } from "@tanstack/react-query";
import ClassManagementToggle from "@/shared/components/ClassManagementToggle";
import { getExamsByClass } from "../services/examService";

type Props = {
	classId: string;
};

const StudentManagementToggle = ({ classId }: Props) => {
	const queryClient = useQueryClient();

	const prefetchExams = () => {
		queryClient.prefetchQuery({
			queryKey: ["exams", classId],
			queryFn: () => getExamsByClass(classId),
		});
	};

	const prefetchStudents = () => {
		// queryClient.prefetchQuery({
		// 	queryKey: ["class-students", classId],
		// 	queryFn: () => fetchClassStudents(classId),
		// });
		// TODO: implement prefetching students
	};

	return (
		<ClassManagementToggle
			classId={classId}
			basePath="my-classes"
			onPrefetchExams={prefetchExams}
			onPrefetchStudents={prefetchStudents}
		/>
	);
};

export default StudentManagementToggle;
