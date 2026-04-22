import type { RouteObject } from "react-router-dom";
import ComingSoon from "@/shared/pages/ComingSoon";

const ExamRoute: RouteObject[] = [
	{
		path: "/exams",
		element: <ComingSoon />,
	},
];

export default ExamRoute;
