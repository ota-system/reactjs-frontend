import { useState } from "react";
import { useTeacherClassQuery } from "./useTeacherClassQuery";
import { useTeacherOverviewQuery } from "./useTeacherOverviewQuery";

export const useClassPage = () => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const { data: classData, isLoading: isClassLoading } = useTeacherClassQuery();
	const { data: overviewData, isLoading: isOverviewLoading } =
		useTeacherOverviewQuery();

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
