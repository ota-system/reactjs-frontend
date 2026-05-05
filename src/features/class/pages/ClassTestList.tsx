import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TeacherTestCard from "@/shared/components/TeacherTestCard";
import { useClassTestsQuery } from "../hooks/useClassTestsQuery";

export default function ClassTestList() {
	const { classId } = useOutletContext<{ classId: string }>();
	const { data: tests, isLoading } = useClassTestsQuery(classId);

	return (
		<Card className="rounded-2xl">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-xl">Danh sách bài thi</CardTitle>
			</CardHeader>
			<CardContent className="p-6 md:p-8 space-y-6 bg-muted/10">
				{isLoading ? (
					<div className="space-y-4">
						<Skeleton className="h-[200px] w-full rounded-xl bg-white" />
						<Skeleton className="h-[200px] w-full rounded-xl bg-white" />
					</div>
				) : tests?.length ? (
					tests.map((test) => (
						<TeacherTestCard
							key={test.id}
							title={test.testName}
							durationMinutes={test.duration}
							questionCount={test.totalQuestions}
							topics={test.topicName ? [test.topicName] : []}
							antiCheatLabel={test.antiCheating ? "Chống gian lận" : undefined}
							onAction={() => {}}
							stats={{
								attempts: test.stats?.attempts || 0,
								averageScore: test.stats?.averageScore || 0,
								highestScore: test.stats?.highestScore || 0,
							}}
							className="bg-white"
						/>
					))
				) : (
					<div className="text-center py-12 text-muted-foreground bg-white rounded-xl">
						Chưa có bài thi nào trong lớp học này.
					</div>
				)}
			</CardContent>
		</Card>
	);
}
