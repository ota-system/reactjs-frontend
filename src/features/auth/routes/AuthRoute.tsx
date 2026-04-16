import type { RouteObject } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignUpSuccess from "../pages/SignUpSuccess";
import VerifyEmail from "../pages/VerifyEmail";

const AuthRoute: RouteObject[] = [
	{
		path: "/sign-in",
		element: <a href="/sign-up">Sign Up page</a>,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
	{
		path: "/sign-up-success",
		element: <SignUpSuccess />,
	},
	{
		path: "/auth/verify",
		element: <VerifyEmail />,
	},
];

export default AuthRoute;
