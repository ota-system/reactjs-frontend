import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ComingSoon from "@/shared/pages/ComingSoon";
import StudentClassDetailLayout from "../layouts/StudentClassDetailLayout";
import StudentClass from "../pages/StudentClass";
import StudentClassExamList from "../pages/StudentClassExamList";
import StudentExamIntro from "../pages/StudentExamIntro";

const ParticipationRoute: RouteObject[] = [
	{
		path: "/my-classes",
		element: <StudentClass />,
	},
	{
		path: "/my-classes/:classId",
		element: <StudentClassDetailLayout />,
		children: [
			{ index: true, element: <Navigate to="exams" replace /> },
			{ path: "exams", element: <StudentClassExamList /> },
			{ path: "students", element: <ComingSoon /> },
		],
	},
	{
		path: "/my-classes/:classId/exams/:examId",
		element: <StudentExamIntro />,
	},
	{
		path: "/my-exams",
		element: <ComingSoon />,
	},
	{
		path: "/my-results",
		element: <ComingSoon />,
	},
	{
		path: "/my-weaknesses",
		element: <ComingSoon />,
	},
];

export default ParticipationRoute;
