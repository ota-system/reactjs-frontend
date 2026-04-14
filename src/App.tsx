import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/api/queryClient";
import "./core/assets/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { SidebarProvider } from "./components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import AppRoute from "./routes/AppRoute";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-right" richColors visibleToasts={5} />
			<BrowserRouter>
				<AppRoute />
			</BrowserRouter>
			<SidebarProvider>
				<TooltipProvider>
					<BrowserRouter>
						<AppRoute />
					</BrowserRouter>
				</TooltipProvider>
			</SidebarProvider>
		</QueryClientProvider>
	);
}

export default App;
