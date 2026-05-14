import { GrAnalytics } from "react-icons/gr";
import { LuAward, LuFileText, LuTrendingDown, LuUsers } from "react-icons/lu";

const studentMenuItems = [
	{
		title: "Lớp học của tôi",
		icon: LuUsers,
		tab: "my-classes",
	},
	{
		title: "Bài thi",
		icon: LuFileText,
		tab: "my-tests",
	},
	{
		title: "Kết quả",
		icon: LuAward,
		tab: "my-results",
	},
	{
		title: "Điểm yếu",
		icon: LuTrendingDown,
		tab: "my-weaknesses",
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
		title: "Quản lý bài thi",
		icon: LuFileText,
		tab: "test-management",
	},
];

export { studentMenuItems, teacherMenuItems };
