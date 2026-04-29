import type { RouteObject } from "react-router-dom";
import ComingSoon from "@/shared/pages/ComingSoon";
import StudentClass from "../pages/StudentClass";
import TestResult from "../pages/TestResult";

const ParticipationRoute: RouteObject[] = [
	{
		path: "/my-classes",
		element: <StudentClass />,
	},
	{
		path: "/my-classes/:classId/exams",
		element: <ComingSoon />,
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
	{
		path: "/my-exams/:id/result",
		element: <TestResult />,
	},
];

export default ParticipationRoute;
