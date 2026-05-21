import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import StudentClassDetailLayout from "../layouts/StudentClassDetailLayout";
import DetailedResult from "../pages/DetailedResult";
import MyAnalytics from "../pages/MyAnalytics";
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
		path: "/my-results",
		element: <TestHistory />,
	},
	{
		path: "/my-results/:id",
		element: <DetailedResult />,
	},
	{
		path: "/my-analytics",
		element: <MyAnalytics />,
	},
	{
		path: "/my-tests/:id/result",
		element: <TestResult />,
	},
];

export default ParticipationRoute;
