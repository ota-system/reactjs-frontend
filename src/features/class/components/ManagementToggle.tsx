import { useQueryClient } from "@tanstack/react-query";
import ClassManagementToggle from "@/shared/components/ClassManagementToggle";
import { fetchClassStudents } from "../services/classService";

// import { fetchClassTests } from "../services/class.api"; // For when tests API is ready

type Props = {
	classId: string;
};

const ManagementToggle = ({ classId }: Props) => {
	const queryClient = useQueryClient();

	// prefetch incuming
	const prefetchTests = () => {
		// queryClient.prefetchQuery({
		// 	queryKey: ['class-tests', classId],
		// 	queryFn: () => fetchClassTests(classId),
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
			onPrefetchTests={prefetchTests}
			onPrefetchStudents={prefetchStudents}
		/>
	);
};

export default ManagementToggle;
