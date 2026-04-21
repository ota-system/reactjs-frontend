import type { RouteObject } from "react-router-dom";
import Class from "../pages/Class";

const ClassRoute: RouteObject[] = [
	{
		path: "/classes",
		element: <Class />,
	},
];

export default ClassRoute;
