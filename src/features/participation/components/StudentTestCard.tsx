import { useNavigate, useParams } from "react-router-dom";
import TestCard from "@/shared/components/TestCard";
import type { TestSummary } from "../types/index";

export default function StudentTestCard({ test }: { test: TestSummary }) {
	const navigate = useNavigate();
	const { classId } = useParams();

	const handleStart = () => {
		navigate(`/my-classes/${classId}/tests/${test.id}`);
	};

	const actionLabel = () => {
		if (test.hasAttempted) {
			return "Xem lại";
		}
		if (test.timesUp) {
			return "Hết hạn";
		}
		return "Làm bài";
	};

	return (
		<TestCard
			title={test.testName}
			durationMinutes={test.duration}
			questionCount={test.totalQuestions}
			topics={[test.topic]}
			isCheating={test.antiCheating}
			actionLabel={actionLabel()}
			onAction={handleStart}
			disabled={test.hasAttempted || test.timesUp}
		/>
	);
}
