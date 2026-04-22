import { Navigate, type RouteObject, useRoutes } from "react-router-dom";
import PrivateLayout from "@/core/layouts/PrivateLayout";
import AnalyticRoute from "@/features/analysis/routes/AnalyticRoute";
import AuthLayout from "@/features/auth/layout/AuthLayout";
import NotFound from "@/features/auth/pages/NotFound";
import Unauthorized from "@/features/auth/pages/Unauthorized";
import AuthRoutes from "@/features/auth/routes/AuthRoute";
import ClassRoute from "@/features/class/routes/ClassRoute";
import ExamRoute from "@/features/exam/routes/ExamRoute";

const AppRoute = () => {
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Navigate to="/classes" />,
		},
		{
			element: <AuthLayout />,
			children: [...AuthRoutes],
		},
		{
			element: <PrivateLayout />,
			children: [...ClassRoute, ...ExamRoute, ...AnalyticRoute],
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
