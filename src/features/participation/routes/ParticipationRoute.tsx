import type { RouteObject } from "react-router";
import ComingSoon from "@/shared/pages/ComingSoon";
import StudentClass from "../pages/StudentClass";

const ParticipationRoute: RouteObject[] = [
	{
		path: "/classes",
		element: <StudentClass />,
	},
	{
		path: "/classes/:classId/exams",
		element: <ComingSoon />,
	},
	{
		path: "/exams",
		element: <ComingSoon />,
	},
	{
		path: "/results",
		element: <ComingSoon />,
	},
	{
		path: "/weaknesses",
		element: <ComingSoon />,
	},
];

export default ParticipationRoute;
