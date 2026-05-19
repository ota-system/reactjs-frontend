import type { RouteObject } from "react-router-dom";
import SelectRole from "../pages/SelectRole";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import SignUpSuccess from "../pages/SignUpSuccess";

const AuthRoute: RouteObject[] = [
	{
		path: "/select-role",
		element: <SelectRole />,
	},
	{
		path: "/sign-in",
		element: <SignIn />,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
	{
		path: "/sign-up-success",
		element: <SignUpSuccess />,
	},
];

export default AuthRoute;
