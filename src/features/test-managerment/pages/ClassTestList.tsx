import { useNavigate, useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TeacherTestCard from "@/shared/components/TeacherTestCard";

export default function ClassTestList() {
	useOutletContext<{ classId: string }>();
	const navigate = useNavigate();

	const handleViewResults = (testId: string) => {
		navigate(`/test-management/tests/${testId}`);
	};

	return (
		<Card className="rounded-2xl">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-xl">Danh sách bài thi</CardTitle>
			</CardHeader>
			<CardContent className="p-6 md:p-8 space-y-6 bg-muted/10">
				{/* Dummy data to match UI */}
				<TeacherTestCard
					title="Grammar & Vocabulary Test - Unit 1"
					durationMinutes={45}
					questionCount={2}
					topics={["Grammar", "Vocabulary"]}
					antiCheatLabel="Chống gian lận"
					onAction={() => handleViewResults("test-1")}
					stats={{
						attempts: 2,
						averageScore: 9,
						highestScore: 9,
					}}
					className="bg-white"
				/>
				<TeacherTestCard
					title="Grammar & Vocabulary Test - Unit 2"
					durationMinutes={45}
					questionCount={2}
					topics={["Grammar", "Vocabulary"]}
					antiCheatLabel="Chống gian lận"
					onAction={() => handleViewResults("test-2")}
					stats={{
						attempts: 2,
						averageScore: 9,
						highestScore: 9,
					}}
					className="bg-white"
				/>
			</CardContent>
		</Card>
	);
}
