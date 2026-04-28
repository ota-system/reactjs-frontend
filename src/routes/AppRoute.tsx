import {
	createBrowserRouter,
	Navigate,
	type RouteObject,
} from "react-router-dom";
import PrivateLayout from "@/core/layouts/PrivateLayout";
import EnglishTestGeneration from "@/features/ai-test-generation/pages/EnglishTestGeneration";
import AnalyticRoute from "@/features/analysis/routes/AnalyticRoute";
import AuthLayout from "@/features/auth/layout/AuthLayout";
import NotFound from "@/features/auth/pages/NotFound";
import Unauthorized from "@/features/auth/pages/Unauthorized";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import AuthRoutes from "@/features/auth/routes/AuthRoute";
import ClassDetailLayout from "@/features/class/layouts/ClassDetailLayout";
import Class from "@/features/class/pages/Class";
import ClassExamList from "@/features/class/pages/ClassExamList";
import ClassStudentList from "@/features/class/pages/ClassStudentList";
import ExamRoute from "@/features/exam/routes/ExamRoute";
import StudentClass from "@/features/participation/pages/StudentClass";
import {
	authLoader,
	selectRoleLoader,
	studentLoader,
	teacherLoader,
} from "@/shared/loaders/auth.loader";
import ComingSoon from "@/shared/pages/ComingSoon";
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
					{
						path: "/classes",
						element: <Class />,
					},
					{
						path: "/classes/:classId",
						element: <ClassDetailLayout />,
						children: [
							{ index: true, element: <Navigate to="students" replace /> },
							{ path: "students", element: <ClassStudentList /> },
							{ path: "exams", element: <ClassExamList /> },
						],
					},
					{
						path: "/classes/:classId/ai-test-generation",
						element: <EnglishTestGeneration />,
					},
					...ExamRoute,
					...AnalyticRoute,
				],
			},

			{
				loader: studentLoader,
				children: [
					{
						path: "/my-classes",
						element: <StudentClass />,
					},
					{
						path: "/my-classes/:classId/exams",
						element: <ComingSoon />,
					},
					{
						path: "/my-exams",
						element: <ComingSoon />,
					},
					{
						path: "/my-results",
						element: <ComingSoon />,
					},
					{
						path: "/my-weaknesses",
						element: <ComingSoon />,
					},
				],
			},
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
