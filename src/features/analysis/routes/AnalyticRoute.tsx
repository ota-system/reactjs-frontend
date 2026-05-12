import type { RouteObject } from "react-router-dom";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";

const AnalyticRoute: RouteObject[] = [
	{
		path: "/analytics",
		element: <AnalyticsDashboard />,
	},
];

export default AnalyticRoute;
