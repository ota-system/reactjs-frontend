import type { RouteObject } from "react-router-dom";
import EnglishTestGeneration from "../pages/EnglishTestGeneration";

const AiTestGenerationRoute: RouteObject[] = [
	{
		path: "/ai-test-generation",
		element: <EnglishTestGeneration />,
	},
];

export default AiTestGenerationRoute;
