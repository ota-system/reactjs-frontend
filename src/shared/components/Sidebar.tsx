import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSignOutMutation } from "@/features/auth/hooks/useSignOutMutation";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import {
	studentMenuItems,
	teacherMenuItems,
} from "@/shared/constants/sidebarMenuItems";
import { useAuthStore } from "@/shared/stores/useAuthStore";

const AppSidebar = () => {
	const location = useLocation();
	const signOutMutation = useSignOutMutation();
	const navigate = useNavigate();
	const userInfo = useAuthStore((state) => state.userInfo);

	const menuItems =
		userInfo?.role === "STUDENT" ? studentMenuItems : teacherMenuItems;

	const handleSignOut = () => {
		signOutMutation.mutate(undefined, {
			onSuccess: (res) => {
				toast.success(res.message || "Đăng xuất thành công!");
				navigate("/sign-in", { replace: true });
			},
			onError: (error: unknown) => {
				const message =
					error instanceof Error ? error.message : "Đăng xuất thất bại";
				toast.error(message);
			},
		});
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="border-b p-4">
				<div className="flex items-center justify-between group-data-[collapsible=icon]:hidden">
					<div className="flex items-center gap-2.5">
						<img
							src="/ota-hub-logo.svg"
							className="size-11 object-contain"
							alt="OTA-Hub logo"
						/>
						<div>
							<h1 className="text-xl font-bold">OTA-Hub</h1>
							<span
								className={cn(
									"text-xs text-white px-2 py-1 rounded",
									userInfo?.role === "STUDENT"
										? "bg-[#C2A56D]"
										: "bg-[#547A95]",
								)}
							>
								{userInfo?.role === "STUDENT" ? "Học sinh" : "Giáo viên"}
							</span>
						</div>
					</div>
					<SidebarTrigger className="shrink-0 cursor-pointer" />
				</div>

				<div className="hidden group-data-[collapsible=icon]:flex items-center justify-center">
					<SidebarTrigger className="cursor-pointer" />
				</div>
			</SidebarHeader>

			<SidebarContent className="py-3 px-3 group-data-[collapsible=icon]:px-2">
				<SidebarGroup className="px-0 pt-0 pb-3">
					<div className="flex items-center gap-2.5 p-2 group-data-[collapsible=icon]:hidden">
						<img
							src={userInfo?.avatarUrl || "/default-avatar.png"}
							className="size-8 rounded-full shrink-0"
							alt="User avatar"
						/>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-semibold">
								{userInfo?.fullName}
							</p>
							<p className="truncate text-xs text-muted-foreground">
								{userInfo?.email}
							</p>
						</div>
					</div>
				</SidebarGroup>

				<SidebarSeparator className="mb-2 mx-0 group-data-[collapsible=icon]:hidden" />

				<SidebarGroup className="px-0">
					<SidebarMenu className="gap-1">
						{menuItems.map((item) => {
							const isActive = location.pathname.startsWith(`/${item.tab}`);

							return (
								<SidebarMenuItem
									key={item.tab}
									onClick={() => {
										navigate(`/${item.tab}`);
									}}
								>
									<SidebarMenuButton
										isActive={isActive}
										tooltip={item.title}
										className={cn(
											"cursor-pointer justify-start group-data-[collapsible=icon]:justify-center",
											isActive
												? "!bg-[var(--primary-color)] !text-[var(--secondary-color)]"
												: "hover:bg-[var(--btn-color-hover)]",
										)}
									>
										<item.icon className="size-4 shrink-0" />
										<span className="group-data-[collapsible=icon]:hidden">
											{item.title}
										</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>

				<SidebarGroup className="flex-1" />
			</SidebarContent>

			<SidebarFooter className="border-t flex items-center justify-center">
				<SidebarMenu>
					<SidebarMenuItem>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<SidebarMenuButton
									disabled={signOutMutation.isPending}
									tooltip="Đăng xuất"
									className="h-10 border cursor-pointer hover:bg-[var(--btn-color-hover)] justify-start group-data-[collapsible=icon]:justify-center"
								>
									<LuLogOut className="size-4 shrink-0" />
									<span className="group-data-[collapsible=icon]:hidden">
										{signOutMutation.isPending
											? "Đang đăng xuất..."
											: "Đăng xuất"}
									</span>
								</SidebarMenuButton>
							</AlertDialogTrigger>

							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Bạn chắc chắn muốn đăng xuất?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng hệ thống.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel className="cursor-pointer">
										Huỷ
									</AlertDialogCancel>
									<AlertDialogAction
										className="cursor-pointer hover:bg-gray-500"
										onClick={handleSignOut}
										disabled={signOutMutation.isPending}
									>
										{signOutMutation.isPending ? "Đang xử lý..." : "Đăng xuất"}
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
