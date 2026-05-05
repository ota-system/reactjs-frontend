import { useNavigate, useParams } from "react-router-dom";
import TestCard from "@/shared/components/TestCard";
import type { TestSummary } from "../types/index";

export default function StudentTestCard({ test }: { test: TestSummary }) {
	const navigate = useNavigate();
	const { classId } = useParams();

	const handleStart = () => {
		navigate(`/my-classes/${classId}/tests/${test.id}`);
	};

	return (
		<TestCard
			title={test.testName}
			durationMinutes={test.duration}
			questionCount={test.totalQuestions}
			topics={[test.topic]}
			antiCheatLabel={test.antiCheating ? "Chống gian lận" : ""}
			actionLabel="Làm bài"
			onAction={handleStart}
		/>
	);
}
