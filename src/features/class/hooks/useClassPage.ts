import { useState } from "react";
import { useTeacherClassQuery } from "./useTeacherClassQuery";

export const useClassPage = () => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

	const { data: classData, isLoading: isClassLoading } = useTeacherClassQuery();

	const classes = classData?.data ?? [];

	return {
		classes,
		isClassLoading,
		isCreateDialogOpen,
		setIsCreateDialogOpen,
	};
};
