import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home";

const HomeRoute: RouteObject[] = [
	{
		path: "/home",
		element: <Home />,
	},
];

export default HomeRoute;
