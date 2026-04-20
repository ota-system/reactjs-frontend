import type { RouteObject } from "react-router-dom";
import ViewExamList from "../pages/ViewExamList";
import ViewStudentList from "../pages/ViewStudentList";

const AuthRoute: RouteObject[] = [
	{
		path: "/teacher/student-list",
		element: <ViewStudentList />,
	},
	{
		path: "/teacher/exam-list",
		element: <ViewExamList />,
	},
];

export default AuthRoute;
