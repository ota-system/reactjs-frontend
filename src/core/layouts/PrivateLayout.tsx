import { Outlet } from "react-router-dom";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/shared/components/Sidebar";

const PrivateLayout = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className="flex items-center gap-2 p-4 border-b">
					<SidebarTrigger />
				</div>
				<main className="flex-1">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default PrivateLayout;
