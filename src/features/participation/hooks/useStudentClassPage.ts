import { useState } from "react";
import { useClassStatsQuery } from "./useClassStatsQuery";
import { useStudentClassQuery } from "./useStudentClassQuery";

export const useStudentClassPage = () => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(1);
	const limit = 8;
	const { data } = useStudentClassQuery(page, limit);
	const { data: statsData } = useClassStatsQuery();

	return {
		open,
		setOpen,
		classes: data?.data ?? [],
		stats: statsData?.data,
		metadata: data?.metadata,
		page,
		setPage,
	};
};
