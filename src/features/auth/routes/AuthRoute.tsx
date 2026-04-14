import type { RouteObject } from "react-router-dom";
import SignUp from "../pages/SignUp";

const AuthRoute: RouteObject[] = [
	{
		path: "/sign-in",
		element: <a href="/sign-up">Sign Up page</a>,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
];

export default AuthRoute;
