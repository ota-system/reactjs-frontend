import { Navigate, type RouteObject } from "react-router-dom";

const AuthRoute: RouteObject[] = [
	{
		path: "/sign-in",
		element: <Navigate to="/sign-in" />,
	},
];

export default AuthRoute;
