import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { tokenService } from "@/lib/tokens";
import AppSidebar from "@/shared/components/Sidebar";

const PrivateLayout = () => {
	const token = tokenService.getAccessToken();
	const isAuthenticated = token !== null;

	let hasRole = false;

	if (token) {
		const decoded: any = jwtDecode(token);
		hasRole = !!decoded.role && decoded.role !== "GUEST";
	}

	if (!isAuthenticated) {
		return <Navigate to="/sign-in" replace />;
	}
	if (!hasRole) {
		return <Navigate to="/select-role" replace />;
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<main className="flex-1">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default PrivateLayout;
