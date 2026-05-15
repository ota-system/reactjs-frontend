import type { RouteObject } from "react-router-dom";
import TestManagementLayout from "../layouts/TestManagementLayout";
import ClassTestList from "../pages/ClassTestList";
import ClassTestReview from "../pages/ClassTestReview";
import TestDetail from "../pages/TestDetail";
import TestManagementIndex from "../pages/TestManagementIndex";

const TestRoute: RouteObject[] = [
	{
		path: "/test-management",
		element: <TestManagementLayout />,
		children: [
			{
				index: true,
				element: <TestManagementIndex />,
			},
			{
				path: "classes/:classId",
				element: <ClassTestList />,
			},
			{
				path: "tests/:testId",
				element: <TestDetail />,
			},
		],
	},
	{
		path: "/classes/:classId/tests/:testId/review",
		element: <ClassTestReview />,
	},
];
export default TestRoute;
