import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/api/queryClient";
import "./core/assets/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppRoute />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
