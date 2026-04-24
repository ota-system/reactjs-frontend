import {
	createBrowserRouter,
	Navigate,
	type RouteObject,
} from "react-router-dom";
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
import {
	authLoader,
	privateLoader,
	selectRoleLoader,
} from "@/shared/loaders/auth.loader";

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
		loader: authLoader,
		children: [...AuthRoutes.filter((r) => r.path !== "/select-role")],
	},
	{
		element: <AuthLayout />,
		loader: selectRoleLoader,
		children: [...AuthRoutes.filter((r) => r.path === "/select-role")],
	},
	{
		element: <PrivateLayout />,
		loader: privateLoader,
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

export const router = createBrowserRouter(routes);
