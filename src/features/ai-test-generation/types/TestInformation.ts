export interface TestInformationValues {
	title: string;
	startDate: string;
	startTime: string;
	durationMinutes: string;
	totalScore: string;
	antiCheatEnabled: boolean;
	publishNow: boolean;
}

export const INITIAL_TEST_INFORMATION: TestInformationValues = {
	title: "",
	startDate: "",
	startTime: "",
	durationMinutes: "45",
	totalScore: "10",
	antiCheatEnabled: true,
	publishNow: false,
};
