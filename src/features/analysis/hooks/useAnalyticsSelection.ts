import { useEffect, useState } from "react";
import type { ApiResponse } from "@/shared/type";
import type { ClassResponse } from "../../class/type";

export const useAnalyticsSelection = (
	classesData: ApiResponse<ClassResponse[]> | undefined,
) => {
	const [selectedClassId, setSelectedClassId] = useState<string | undefined>();
	const [selectedTestId, setSelectedTestId] = useState<string | undefined>();

	useEffect(() => {
		if (classesData?.data && classesData.data.length > 0 && !selectedClassId) {
			setSelectedClassId(classesData.data[0].id);
		}
	}, [classesData, selectedClassId]);

	const handleClassChange = (val: string) => {
		setSelectedClassId(val);
		setSelectedTestId(undefined);
	};

	const handleTestChange = (val: string) => {
		setSelectedTestId(val);
	};

	return {
		selectedClassId,
		selectedTestId,
		handleClassChange,
		handleTestChange,
	};
};
