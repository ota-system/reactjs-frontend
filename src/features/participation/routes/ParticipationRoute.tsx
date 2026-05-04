import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ComingSoon from "@/shared/pages/ComingSoon";
import StudentClassDetailLayout from "../layouts/StudentClassDetailLayout";
import StudentClass from "../pages/StudentClass";
import StudentClassTestList from "../pages/StudentClassTestList";
import StudentTestIntro from "../pages/StudentTestIntro";
import TestResult from "../pages/TestResult";

const ParticipationRoute: RouteObject[] = [
	{
		path: "/my-classes",
		element: <StudentClass />,
	},
	{
		path: "/my-classes/:classId",
		element: <StudentClassDetailLayout />,
		children: [
			{ index: true, element: <Navigate to="tests" replace /> },
			{ path: "tests", element: <StudentClassTestList /> },
			{ path: "students", element: <ComingSoon /> },
		],
	},
	{
		path: "/my-classes/:classId/tests/:testId",
		element: <StudentTestIntro />,
	},
	{
		path: "/my-tests",
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
		path: "/my-tests/:id/result",
		element: <TestResult />,
	},
];

export default ParticipationRoute;
