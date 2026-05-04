import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ClassDetailLayout from "../layouts/ClassDetailLayout";
import Class from "../pages/Class";
import ClassStudentList from "../pages/ClassStudentList";
import ClassTestList from "../pages/ClassTestList";

const ClassRoute: RouteObject[] = [
	{
		path: "/classes",
		element: <Class />,
	},
	{
		path: "/classes/:classId",
		element: <ClassDetailLayout />,
		children: [
			{
				index: true,
				element: <Navigate to="students" replace />,
			},
			{
				path: "students",
				element: <ClassStudentList />,
			},
			{
				path: "tests",
				element: <ClassTestList />,
			},
		],
	},
];

export default ClassRoute;
