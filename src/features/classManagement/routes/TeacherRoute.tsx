import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ClassDetailLayout from "../layouts/ClassDetailLayout";
import ClassExamList from "../pages/ClassExamList";
import ClassStudentList from "../pages/ClassStudentList";

const TeacherRoute: RouteObject[] = [
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
				path: "exams",
				element: <ClassExamList />,
			},
		],
	},
];

export default TeacherRoute;
