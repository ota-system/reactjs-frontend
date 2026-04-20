import { Navigate, type RouteObject, useRoutes } from "react-router-dom";
import PrivateLayout from "@/core/layouts/PrivateLayout";
import TeacherLayout from "@/core/layouts/TeacherLayout";
import AuthLayout from "@/features/auth/layout/AuthLayout";
import NotFound from "@/features/auth/pages/NotFound";
import Unauthorized from "@/features/auth/pages/Unauthorized";
import AuthRoutes from "@/features/auth/routes/AuthRoute";
import TeacherRoute from "@/features/classManagement/routes/TeacherRoute";
import HomeRoute from "@/features/home/routes/HomeRoute";

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
			element: <PrivateLayout />,
			children: [...HomeRoute],
		},
		{
			element: <TeacherLayout />,
			children: [...TeacherRoute],
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
