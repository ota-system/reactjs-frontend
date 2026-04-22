import type { RouteObject } from "react-router-dom";
import ComingSoon from "@/shared/pages/ComingSoon";

const AnalyticRoute: RouteObject[] = [
	{
		path: "/analytics",
		element: <ComingSoon />,
	},
];

export default AnalyticRoute;
