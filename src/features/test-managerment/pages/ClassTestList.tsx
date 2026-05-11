import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TeacherTestCard from "@/shared/components/TeacherTestCard";
import { useClassTestsQuery } from "../../class/hooks/useClassTestsQuery";

export default function ClassTestList() {
	const { classId } = useParams<{ classId: string }>();
	const { data: tests, isLoading } = useClassTestsQuery(classId!);
	const navigate = useNavigate();

	const handleViewResults = (testId: string) => {
		navigate(`/test-management/tests/${testId}`);
	};
	let content = null;
	if (isLoading) {
		content = (
			<div className="space-y-4">
				<Skeleton className="h-[200px] w-full rounded-xl bg-white" />
				<Skeleton className="h-[200px] w-full rounded-xl bg-white" />
			</div>
		);
	} else if (tests && tests.length > 0) {
		content = tests.map((test) => (
			<TeacherTestCard
				key={test.id}
				title={test.testName}
				durationMinutes={test.duration}
				questionCount={test.totalQuestions}
				topics={test.topicName ? [test.topicName] : []}
				antiCheatLabel={test.antiCheating ? "Chống gian lận" : ""}
				onAction={() => handleViewResults(test.id)}
				stats={{
					attempts: test.stats?.attempts || 0,
					averageScore: test.stats?.averageScore || 0,
					highestScore: test.stats?.highestScore || 0,
				}}
				className="bg-white"
			/>
		));
	} else {
		content = (
			<div className="text-center py-12 text-muted-foreground bg-white rounded-xl">
				Chưa có bài thi nào trong lớp học này.
			</div>
		);
	}

	return (
		<Card className="rounded-2xl">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-xl">Danh sách bài thi</CardTitle>
			</CardHeader>
			<CardContent className="p-6 md:p-8 space-y-6 bg-muted/10">
				{content}
			</CardContent>
		</Card>
	);
}
