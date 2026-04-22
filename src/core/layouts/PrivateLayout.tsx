import { Navigate, Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { tokenService } from "@/lib/tokens";
import AppSidebar from "@/shared/components/Sidebar";

const PrivateLayout = () => {
	const isAuthenticated = tokenService.getAccessToken() !== null;

	if (!isAuthenticated) {
		return <Navigate to="/sign-in" replace />;
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
