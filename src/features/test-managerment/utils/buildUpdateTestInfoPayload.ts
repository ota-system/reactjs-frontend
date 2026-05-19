import type { TestInformationValues } from "@/shared/interfaces/TestInformation";
import type { UpdateTestInfoPayload } from "../type";
import buildStartTime from "./buildStartTime";

export const buildUpdateTestInfoPayload = (
	testInformation: TestInformationValues,
): UpdateTestInfoPayload => {
	const duration = Number(testInformation.durationMinutes);

	return {
		testName: testInformation.title.trim(),
		topicName: testInformation.topic?.trim() ?? "",
		startedTime: buildStartTime(testInformation),
		duration: duration ?? 0,
		antiCheating: testInformation.antiCheatEnabled,
	};
};
