import { createBrowserRouter, type RouteObject } from "react-router-dom";
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
import TakingTest from "@/features/participation/pages/TakingTest";
import ParticipationRoute from "@/features/participation/routes/ParticipationRoute";
import {
	authLoader,
	selectRoleLoader,
	studentLoader,
	teacherLoader,
} from "@/shared/loaders/auth.loader";
import RootRedirect from "./RootRedirect";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <RootRedirect />,
	},
	{
		path: "/auth/verify",
		element: <VerifyEmail />,
	},
	{
		element: <AuthLayout />,
		loader: authLoader,
		children: AuthRoutes.filter((r) => r.path !== "/select-role"),
	},
	{
		element: <AuthLayout />,
		loader: selectRoleLoader,
		children: AuthRoutes.filter((r) => r.path === "/select-role"),
	},

	{
		element: <PrivateLayout />,
		children: [
			{
				loader: teacherLoader,
				children: [
					...ClassRoute,
					...AiTestGenerationRoute,
					...ExamRoute,
					...AnalyticRoute,
				],
			},
			{
				loader: studentLoader,
				children: [...ParticipationRoute],
			},
		],
	},
	{
		path: "/taking-test/:testId",
		element: <TakingTest />,
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
