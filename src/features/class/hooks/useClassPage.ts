import { useState } from "react";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { useTeacherClassQuery } from "./useTeacherClassQuery";
import { useTeacherOverviewQuery } from "./useTeacherOverviewQuery";

export const useClassPage = () => {
	const teacherId = useAuthStore((s) => s.userInfo?.id);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const { data: classData, isLoading: isClassLoading } = useTeacherClassQuery();
	const { data: overviewData, isLoading: isOverviewLoading } =
		useTeacherOverviewQuery(teacherId);

	const classes = classData?.data ?? [];
	const overview = overviewData?.data;

	return {
		classes,
		isClassLoading,
		overview,
		isOverviewLoading,
		isCreateDialogOpen,
		setIsCreateDialogOpen,
	};
};
