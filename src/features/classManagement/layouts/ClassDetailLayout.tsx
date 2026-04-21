import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import CourseHeader from "../components/CourseHeader";
import ManagementToggle from "../components/ManagementToggle";
import { fetchClassDetail } from "../services/class.api";

export default function ClassDetailLayout() {
	const { classId } = useParams();

	const { data: classroom, isLoading } = useQuery({
		queryKey: ["class-detail", classId],
		queryFn: () => fetchClassDetail(classId as string),
		staleTime: 1000 * 60 * 30, // 30 minutes
		enabled: !!classId,
	});

	return (
		<div className="flex justify-center items-center flex-col gap-4">
			{isLoading ? (
				<div className="w-full p-4">
					<Skeleton className="h-20 w-full rounded-lg" />
				</div>
			) : (
				<CourseHeader classData={classroom} />
			)}

			<div className="w-full self-start p-4 flex flex-col gap-6">
				{/* Toggle & Children Outlet */}
				{classId && (
					<>
						<ManagementToggle classId={classId} />
						<div className="mt-2 w-full border rounded-lg bg-card min-h-[400px]">
							<Outlet context={{ classId }} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}
