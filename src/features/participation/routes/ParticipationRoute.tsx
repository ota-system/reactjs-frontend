import type { RouteObject } from "react-router-dom";
import ComingSoon from "@/shared/pages/ComingSoon";
import StudentClass from "../pages/StudentClass";

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
];

export default ParticipationRoute;
