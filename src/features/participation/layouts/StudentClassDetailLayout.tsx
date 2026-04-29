import { Outlet, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useClassDetailQuery } from "@/features/class/hooks/useClassDetailQuery";
import StudentCourseHeader from "../components/StudentCourseHeader";
import StudentManagementToggle from "../components/StudentManagementToggle";

export default function StudentClassDetailLayout() {
	const { classId } = useParams();

	const { data: classroom, isLoading } = useClassDetailQuery(classId);

	return (
		<div className="flex justify-center items-center flex-col gap-4">
			{isLoading ? (
				<div className="w-full p-4">
					<Skeleton className="h-20 w-full rounded-lg" />
				</div>
			) : (
				<StudentCourseHeader classData={classroom} />
			)}

			<div className="w-full self-start p-4 flex flex-col gap-6">
				{classId && (
					<>
						<StudentManagementToggle classId={classId} />
						<div className="mt-2 w-full border rounded-lg bg-card min-h-[400px]">
							<Outlet context={{ classId }} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}
