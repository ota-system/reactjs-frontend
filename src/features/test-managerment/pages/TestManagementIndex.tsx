import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeacherClassQuery } from "../hooks/useTeacherClassQuery";

const TestManagementIndex = () => {
	const { data, isLoading } = useTeacherClassQuery();
	const firstClassId = data?.data?.[0]?.id;

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-10 w-64" />
				<Skeleton className="h-32 w-full rounded-xl" />
			</div>
		);
	}

	if (firstClassId) {
		return <Navigate to={`/test-management/classes/${firstClassId}`} replace />;
	}

	return (
		<Card className="rounded-2xl">
			<CardContent className="py-8 text-center text-muted-foreground">
				Chưa có lớp học nào để quản lý kết quả thi.
			</CardContent>
		</Card>
	);
};

export default TestManagementIndex;
