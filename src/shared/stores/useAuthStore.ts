import { create } from "zustand";
import type { UserInfo } from "../type";

interface AuthState {
	userInfo: UserInfo | null;
	setUserInfo: (user: UserInfo | null) => void;
	clearUserInfo: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	userInfo: null,
	setUserInfo: (user) => set({ userInfo: user }),
	clearUserInfo: () => set({ userInfo: null }),
}));
