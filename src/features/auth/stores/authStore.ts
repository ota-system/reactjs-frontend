import { create } from "zustand";

type AuthState = {
	loading: boolean;
	setLoading: (loading: boolean) => void;
};

const useAuthStore = create<AuthState>((set) => ({
	loading: false,
	setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;
