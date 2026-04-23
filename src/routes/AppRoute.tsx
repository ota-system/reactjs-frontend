import { Navigate, type RouteObject, useRoutes } from "react-router-dom";
import PrivateLayout from "@/core/layouts/PrivateLayout";
import AiTestGenerationRoute from "@/features/ai-test-generation/routes/AiTestGenerationRoute";
import AnalyticRoute from "@/features/analysis/routes/AnalyticRoute";
import AuthLayout from "@/features/auth/layout/AuthLayout";
import NotFound from "@/features/auth/pages/NotFound";
import Unauthorized from "@/features/auth/pages/Unauthorized";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
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
			path: "/auth/verify",
			element: <VerifyEmail />,
		},
		{
			element: <AuthLayout />,
			children: [...AuthRoutes],
		},
		{
			element: <PrivateLayout />,
			children: [
				...ClassRoute,
				...ExamRoute,
				...AnalyticRoute,
				...AiTestGenerationRoute,
			],
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
