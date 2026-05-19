import { Outlet, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useClassDetailQuery } from "@/features/class/hooks/useClassDetailQuery";
import type { HttpError } from "@/shared/type";
import ClassAccessDenied from "../components/ClassAccessDenied";
import StudentCourseHeader from "../components/StudentCourseHeader";
import StudentManagementToggle from "../components/StudentManagementToggle";
import {
	ERROR_CODE_CLASS_ACCESS_DENIED,
	HTTP_STATUS_FORBIDDEN,
} from "../constants/httpErrors";

export default function StudentClassDetailLayout() {
	const { classId } = useParams();

	const {
		data: classroom,
		isLoading,
		isError,
		error,
	} = useClassDetailQuery(classId);

	if (isError) {
		const httpError = error as unknown as HttpError;
		if (
			httpError?.status === HTTP_STATUS_FORBIDDEN ||
			httpError?.code === ERROR_CODE_CLASS_ACCESS_DENIED
		) {
			return <ClassAccessDenied />;
		}
	}

	if (isLoading) {
		return (
			<div className="w-full p-4">
				<Skeleton className="h-20 w-full rounded-lg" />
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center flex-col gap-4">
			<StudentCourseHeader classData={classroom} />

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
