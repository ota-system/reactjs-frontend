import { GrAnalytics } from "react-icons/gr";
import { LuAward, LuFileText, LuTrendingDown, LuUsers } from "react-icons/lu";

const studentMenuItems = [
	{
		title: "Lớp học của tôi",
		icon: LuUsers,
		tab: "my-classes",
	},
	{
		title: "Kết quả",
		icon: LuAward,
		tab: "my-results",
	},
	{
		title: "Phân tích điểm số",
		icon: LuTrendingDown,
		tab: "my-analytics",
	},
];

const teacherMenuItems = [
	{
		title: "Tổng quan",
		icon: GrAnalytics,
		tab: "overview",
	},
	{
		title: "Lớp học",
		icon: LuUsers,
		tab: "classes",
	},
	{
		title: "Quản lý kết quả thi",
		icon: LuFileText,
		tab: "test-management",
	},
];

export { studentMenuItems, teacherMenuItems };
