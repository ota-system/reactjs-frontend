import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/api/queryClient";
import "./core/assets/styles/index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { router } from "./routes/AppRoute";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-right" richColors visibleToasts={5} />
			<TooltipProvider>
				<RouterProvider router={router} />
			</TooltipProvider>
		</QueryClientProvider>
	);
}

export default App;
