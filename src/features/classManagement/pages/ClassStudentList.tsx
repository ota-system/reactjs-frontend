import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentList } from "../components/StudentList";
import { fetchClassStudents } from "../services/class.api";

export default function ClassStudentList() {
	const { classId } = useOutletContext<{ classId: string }>();

	const { data: students, isLoading } = useQuery({
		queryKey: ["class-students", classId],
		queryFn: () => fetchClassStudents(classId),
		staleTime: 1000 * 60 * 5, // 5 minutes
		enabled: !!classId,
	});

	if (isLoading) {
		return (
			<div className="p-6 space-y-4">
				<Skeleton className="h-10 w-1/4" />
				<Skeleton className="h-[400px] w-full" />
			</div>
		);
	}

	return (
		<div className="w-full h-full">
			<StudentList students={students || []} />
		</div>
	);
}
