import type { TestSummary } from "@/features/participation/types";
import type { TestInformationValues } from "@/shared/interfaces/TestInformation";

const mapTestDetailToValues = (
	detail: TestSummary | undefined,
): TestInformationValues => {
	const started = detail?.startedTime;
	let startDate = "";
	let startTime = "";

	if (started) {
		try {
			const d = new Date(started);
			const iso = d.toISOString();
			startDate = iso.slice(0, 10);
			startTime = iso.slice(11, 16);
		} catch (e) {
			startDate = "";
			startTime = "";
		}
	}

	return {
		title: detail?.testName ?? "",
		startDate,
		startTime,
		durationMinutes: String(detail?.duration ?? "45"),
		totalScore: String(detail?.totalQuestions ?? "0"),
		antiCheatEnabled: Boolean(detail?.antiCheating),
		publishNow: false,
		topic: detail?.topic ?? "",
	};
};

export default mapTestDetailToValues;
