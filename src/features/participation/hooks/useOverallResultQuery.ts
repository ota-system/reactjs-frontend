import { useQuery } from "@tanstack/react-query";
import { getOverallResult } from "../services/studentResultService";

export const useOverallResultQuery = (id: string | undefined) => {
	return useQuery({
		queryKey: ["overall-result", id],
		queryFn: () => getOverallResult(id!),
		enabled: !!id,
	});
};
