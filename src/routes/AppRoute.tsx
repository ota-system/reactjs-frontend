import {
	createBrowserRouter,
	Navigate,
	type RouteObject,
	redirect,
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
import { tokenService } from "@/lib/tokens";
import { getCurrentUserInformation } from "@/shared/services/userDetailService";
import { useAuthStore } from "@/shared/stores/useAuthStore";

const checkAuthAndFetchUser = async () => {
	const token = tokenService.getAccessToken();
	if (!token) {
		return null;
	}

	let userInfo = useAuthStore.getState().userInfo;
	if (!userInfo) {
		try {
			const res = await getCurrentUserInformation();
			userInfo = res.data;
			useAuthStore.getState().setUserInfo(userInfo);
		} catch (error) {
			tokenService.clearTokens();
			useAuthStore.getState().clearUserInfo();
			return null;
		}
	}
	return userInfo;
};

const privateLoader = async () => {
	const userInfo = await checkAuthAndFetchUser();
	if (!userInfo) {
		return redirect("/sign-in");
	}
	const hasRole = !!userInfo.role && userInfo.role !== "NULL";
	if (!hasRole) {
		return redirect("/select-role");
	}
	return null;
};

const authLoader = async () => {
	const userInfo = await checkAuthAndFetchUser();
	if (userInfo) {
		const hasRole = !!userInfo.role && userInfo.role !== "NULL";
		if (hasRole) {
			return redirect("/");
		}
	}
	return null;
};

const selectRoleLoader = async () => {
	const userInfo = await checkAuthAndFetchUser();
	if (!userInfo) {
		return redirect("/sign-in");
	}
	const hasRole = !!userInfo.role && userInfo.role !== "NULL";
	if (hasRole) {
		return redirect("/");
	}
	return null;
};

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
