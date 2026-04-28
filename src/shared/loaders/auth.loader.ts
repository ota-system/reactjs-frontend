import { redirect } from "react-router-dom";
import { tokenService } from "@/lib/tokens";
import { getCurrentUserInformation } from "../services/userDetailService";
import { useAuthStore } from "../stores/useAuthStore";

export const checkAuthAndFetchUser = async () => {
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

export const authLoader = async () => {
	const userInfo = await checkAuthAndFetchUser();
	if (userInfo) {
		const hasRole = !!userInfo.role && userInfo.role !== "NULL";
		if (hasRole) {
			return redirect("/");
		}
	}
	return null;
};

export const selectRoleLoader = async () => {
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

const createRoleLoader = (blockedRole: string) => async () => {
	const userInfo = await checkAuthAndFetchUser();
	if (!userInfo) {
		return redirect("/sign-in");
	}
	if (!userInfo.role || userInfo.role === "NULL") {
		return redirect("/select-role");
	}
	if (userInfo.role === blockedRole) {
		return redirect("/unauthorized");
	}
	return null;
};

export const teacherLoader = createRoleLoader("STUDENT");
export const studentLoader = createRoleLoader("TEACHER");
