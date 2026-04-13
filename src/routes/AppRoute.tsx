import { Navigate, type RouteObject, useRoutes } from "react-router-dom";

import AuthLayout from "@/features/auth/layout/AuthLayout";
import NotFound from "@/features/auth/pages/NotFound";
import Unauthorized from "@/features/auth/pages/Unauthorized";
import AuthRoutes from "@/features/auth/routes/AuthRoute";

const AppRoute = () => {
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Navigate to="/sign-in" />,
		},
		{
			element: <AuthLayout />,
			children: [...AuthRoutes],
		},
		{
			path: "/unauthorized",
			element: <Unauthorized />,
		},
		{
			path: "/*",
			element: <NotFound />,
		},
	];

	return useRoutes(routes);
};

export default AppRoute;
