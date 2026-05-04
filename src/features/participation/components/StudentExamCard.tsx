import { useNavigate, useParams } from "react-router-dom";
import ExamCard from "@/shared/components/ExamCard";
import type { ExamSummary } from "../types/exam.type";

export default function StudentExamCard({ exam }: { exam: ExamSummary }) {
	const navigate = useNavigate();
	const { classId } = useParams();

	const handleStart = () => {
		navigate(`/my-classes/${classId}/exams/${exam.id}`);
	};

	return (
		<ExamCard
			title={exam.testName}
			durationMinutes={exam.duration}
			questionCount={exam.totalQuestions}
			topics={[exam.topic]}
			antiCheatLabel={exam.antiCheating ? "Chống gian lận" : ""}
			actionLabel="Làm bài"
			onAction={handleStart}
		/>
	);
}
