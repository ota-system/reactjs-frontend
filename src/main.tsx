import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/core/assets/styles/index.css";
import "@/features/auth/styles/layout.css";
import { Toaster } from "sonner";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster position="top-right" richColors visibleToasts={5} />
		<App />
	</StrictMode>,
);
