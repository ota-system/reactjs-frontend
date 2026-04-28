import { useQuery } from "@tanstack/react-query";
import { previewClass } from "../services/classService";

const useClassPreviewQuery = (code: string | undefined) => {
	return useQuery({
		queryKey: ["class-preview", code],
		queryFn: () => previewClass(code as string),
		enabled: !!code,
	});
};

export default useClassPreviewQuery;
