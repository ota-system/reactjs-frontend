import { useQueryClient } from "@tanstack/react-query";
import ClassManagementToggle from "@/shared/components/ClassManagementToggle";
import { getTestsByClass } from "../services/testService";

type Props = {
	classId: string;
};

const StudentManagementToggle = ({ classId }: Props) => {
	const queryClient = useQueryClient();

	const prefetchTests = () => {
		queryClient.prefetchQuery({
			queryKey: ["tests", classId],
			queryFn: () => getTestsByClass(classId),
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
			onPrefetchTests={prefetchTests}
			onPrefetchStudents={prefetchStudents}
		/>
	);
};

export default StudentManagementToggle;
