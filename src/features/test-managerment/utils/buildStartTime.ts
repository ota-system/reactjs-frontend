import type { TestInformationValues } from "@/shared/interfaces/TestInformation";

const buildStartTime = (testInformation: TestInformationValues) => {
	if (testInformation.publishNow) {
		return new Date().toISOString();
	}

	const hasStartDate = testInformation.startDate.trim().length > 0;
	const hasStartTime = testInformation.startTime.trim().length > 0;

	const startTimestamp = Date.parse(
		`${testInformation.startDate}T${testInformation.startTime}:00`,
	);

	if (!hasStartDate || !hasStartTime || Number.isNaN(startTimestamp)) {
		return "";
	}

	return new Date(startTimestamp).toISOString();
};

export default buildStartTime;
