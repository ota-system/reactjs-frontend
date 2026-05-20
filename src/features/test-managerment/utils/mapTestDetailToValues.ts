import { format } from "date-fns";
import type { TestSummary } from "@/features/participation/types";
import type { TestInformationValues } from "@/shared/interfaces/TestInformation";

const mapTestDetailToValues = (
	detail: TestSummary | undefined,
): TestInformationValues => {
	return {
		title: detail?.testName ?? "",
		startDate: format(
			new Date(detail?.startedTime ?? Date.now()),
			"yyyy-MM-dd",
		),
		startTime: format(new Date(detail?.startedTime ?? Date.now()), "HH:mm"),
		durationMinutes: String(detail?.duration ?? "45"),
		totalScore: String(detail?.totalQuestions ?? "0"),
		antiCheatEnabled: Boolean(detail?.antiCheating),
		publishNow: false,
		topic: detail?.topic ?? "",
	};
};

export default mapTestDetailToValues;
