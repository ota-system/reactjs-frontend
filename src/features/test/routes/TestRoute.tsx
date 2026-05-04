import type { RouteObject } from "react-router-dom";
import ComingSoon from "@/shared/pages/ComingSoon";

const TestRoute: RouteObject[] = [
	{
		path: "/tests",
		element: <ComingSoon />,
	},
];

export default TestRoute;
