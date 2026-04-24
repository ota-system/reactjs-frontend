import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/shared/components/Sidebar";
import { useAuth } from "@/shared/hooks/useAuth";

const PrivateLayout = () => {
	useAuth();

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
