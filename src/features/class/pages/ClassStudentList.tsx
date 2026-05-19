import { useOutletContext } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentList } from "@/shared/components/StudentList";
import { useClassStudentsQuery } from "../hooks/useClassStudentsQuery";

export default function ClassStudentList() {
	const { classId } = useOutletContext<{ classId: string }>();

	const { data: students, isLoading } = useClassStudentsQuery(classId);

	if (isLoading) {
		return (
			<div className="p-6 space-y-4">
				<Skeleton className="h-10 w-1/4" />
				<Skeleton className="h-[400px] w-full" />
			</div>
		);
	}

	return (
		<div className="size-full">
			<StudentList students={students || []} />
		</div>
	);
}
