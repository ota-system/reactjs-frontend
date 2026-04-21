import { create } from "zustand";

type AppState = {
	tab: string | null;
	setTab: (tab: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
	tab: null,
	setTab: (tab) => set({ tab }),
}));
