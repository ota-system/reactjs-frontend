import { useState } from "react";
import { useClassStatsQuery } from "./useClassStatsQuery";
import { useStudentClassQuery } from "./useStudentClassQuery";

export const useStudentClassPage = () => {
	const [open, setOpen] = useState(false);
	const { data } = useStudentClassQuery();
	const { data: statsData } = useClassStatsQuery();

	return {
		open,
		setOpen,
		classes: data?.data ?? [],
		stats: statsData?.data,
	};
};
