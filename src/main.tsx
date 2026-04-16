import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/core/assets/styles/index.css";
import "@/features/auth/styles/layout.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
