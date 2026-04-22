import { useOutletContext } from "react-router-dom";
import ExamCard from "@/shared/components/ExamCard";
export default function ClassExamList() {
	useOutletContext<{ classId: string }>();

	return (
		<div className="p-8 text-center text-muted-foreground border rounded-lg bg-card">
			<ExamCard
				title="Bài thi giữa kỳ"
				durationMinutes={60}
				questionCount={20}
				topics={["Toán", "Học kỳ 1"]}
				onAction={() => {}}
				antiCheatLabel="Chống gian lận"
				actionLabel="Xem kết quả"
				className="PNV26A"
			/>
		</div>
	);
}
