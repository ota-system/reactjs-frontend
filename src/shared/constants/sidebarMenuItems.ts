import { GrAnalytics } from "react-icons/gr";
import { LuAward, LuFileText, LuTrendingDown, LuUsers } from "react-icons/lu";

const studentMenuItems = [
	{
		title: "Lớp học của tôi",
		icon: LuUsers,
		tab: "classes",
	},
	{
		title: "Bài thi",
		icon: LuFileText,
		tab: "exams",
	},
	{
		title: "Kết quả",
		icon: LuAward,
		tab: "results",
	},
	{
		title: "Điểm yếu",
		icon: LuTrendingDown,
		tab: "weaknesses",
	},
];

const teacherMenuItems = [
	{
		title: "Lớp học",
		icon: LuUsers,
		tab: "classes",
	},
	{
		title: "Quản lý bài thi",
		icon: LuFileText,
		tab: "exams",
	},
	{
		title: "Phân tích",
		icon: GrAnalytics,
		tab: "analytics",
	},
];

export { studentMenuItems, teacherMenuItems };
