import type { RouteObject } from "react-router-dom";
import TestManagementLayout from "../layouts/TestManagementLayout";
import ClassList from "../pages/ClassList";
import ClassTestList from "../pages/ClassTestList";
import TestDetail from "../pages/TestDetail";

const TestRoute: RouteObject[] = [
	{
		path: "/test-management",
		element: <TestManagementLayout />,
		children: [
			{
				index: true,
				element: <ClassList />,
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
];
export default TestRoute;
