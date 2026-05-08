import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ComingSoon from "@/shared/pages/ComingSoon";
import StudentClassDetailLayout from "../layouts/StudentClassDetailLayout";
import DetailedResult from "../pages/DetailedResult";
import StudentClass from "../pages/StudentClass";
import StudentClassTestList from "../pages/StudentClassTestList";
import StudentList from "../pages/StudentList";
import StudentTestIntro from "../pages/StudentTestIntro";
import TestHistory from "../pages/TestHistory";
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
			{ path: "students", element: <StudentList /> },
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
		element: <TestHistory />,
	},
	{
		path: "/my-results/:id",
		element: <DetailedResult />,
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
