import { LuLogOut } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
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
import { cn } from "@/lib/utils";
import {
	studentMenuItems,
	teacherMenuItems,
} from "@/shared/constants/sidebarMenuItems";

// TODO: Fetch user data from API
import { user } from "@/shared/data/mook";

const AppSidebar = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const menuItems =
		user.role === "STUDENT" ? studentMenuItems : teacherMenuItems;

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
							const tab = searchParams.get("tab");
							const isActive = tab === item.tab;

							return (
								<SidebarMenuItem
									key={item.tab}
									onClick={() =>
										setSearchParams((prevSearchParams) => {
											const nextSearchParams = new URLSearchParams(
												prevSearchParams,
											);
											nextSearchParams.set("tab", item.tab);
											return nextSearchParams;
										})
									}
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
					{/* TODO: Implement logout functionality */}
					<SidebarMenuItem onClick={() => {}}>
						<SidebarMenuButton className="h-10 border cursor-pointer hover:bg-[var(--btn-color-hover)]">
							<LuLogOut className="size-4" />
							<span className="font-medium">Đăng xuất</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
