import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
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
} from "@/components/ui/sidebar";
import { useSignOutMutation } from "@/features/auth/hooks/useSignOutMutation";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import {
	studentMenuItems,
	teacherMenuItems,
} from "@/shared/constants/sidebarMenuItems";
// TODO: Fetch user data from API
import { user } from "@/shared/data/mook";
import { useAppStore } from "../stores/useAppStore";

const AppSidebar = () => {
	const { tab, setTab } = useAppStore();
	const signOutMutation = useSignOutMutation();
	const navigate = useNavigate();

	const menuItems =
		user.role === "STUDENT" ? studentMenuItems : teacherMenuItems;

	const handleSignOut = () => {
		signOutMutation.mutate(undefined, {
			onSuccess: (res) => {
				toast.success(res.message || "Đăng xuất thành công!");
				navigate("/sign-in");
			},
			onError: (error: unknown) => {
				const message =
					error instanceof Error ? error.message : "Đăng xuất thất bại";
				toast.error(message);
			},
		});
	};

	return (
		<Sidebar>
			<SidebarHeader className="border-b p-4">
				<div className="flex items-center gap-2.5">
					<img
						src="/big-logo.png"
						alt="OTA-Hub logo"
						className="h-10 w-10 object-contain"
					/>
					<div>
						<h1 className="text-xl font-bold">OTA-Hub</h1>
						<span className="text-xs">
							{user.role === "STUDENT" ? "Học sinh" : "Giáo viên"}
						</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent className="p-3">
				<SidebarGroup className="px-0 pt-0 pb-3">
					<div className="flex w-full items-center gap-2.5 p-2 text-left">
						<img
							src="/user-avatar.png"
							alt="User avatar"
							className="flex size-8 items-center justify-center rounded-full text-sm font-medium uppercase"
						/>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-semibold">{user.name}</p>
							<p className="truncate text-xs text-muted-foreground">
								{user.email}
							</p>
						</div>
					</div>
				</SidebarGroup>

				<SidebarSeparator className="mb-2 mx-0" />

				<SidebarGroup className="px-0">
					<SidebarMenu className="gap-1">
						{menuItems.map((item) => {
							const isActive = tab === item.tab;

							return (
								<SidebarMenuItem
									key={item.tab}
									onClick={() => {
										navigate(`/${item.tab}`);
										setTab(item.tab);
									}}
								>
									<SidebarMenuButton
										isActive={isActive}
										className={cn(
											"cursor-pointer",
											isActive
												? "!bg-[var(--primary-color)] !text-[var(--secondary-color)]"
												: "hover:bg-[var(--btn-color-hover)]",
										)}
									>
										<item.icon className="size-4" />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>

				<SidebarGroup className="flex-1" />
			</SidebarContent>
			<SidebarFooter className="border-t p-3">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							onClick={handleSignOut}
							disabled={signOutMutation.isPending}
							className="h-10 border cursor-pointer hover:bg-[var(--btn-color-hover)]"
						>
							<LuLogOut className="size-4" />
							<span className="font-medium">
								{signOutMutation.isPending ? "Đang đăng xuất..." : "Đăng xuất"}
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
