import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import TeacherTestCard from "@/shared/components/TeacherTestCard";
import { useClassTestsQuery } from "../../class/hooks/useClassTestsQuery";
import { ClassInfoCardInTestListPage } from "../components/ClassInfoCardInTestListPage";
import { useTeacherClassQuery } from "../hooks/useTeacherClassQuery";
import type { ClassResponse } from "../type";

export default function ClassTestList() {
	const { classId } = useParams<{ classId: string }>();
	const { data: tests, isLoading } = useClassTestsQuery(classId!);
	const { data: classesData, isLoading: isClassesLoading } =
		useTeacherClassQuery();
	const navigate = useNavigate();

	const selectedClass = classesData?.data?.find(
		(cls: ClassResponse) => cls.id === classId,
	);

	const handleSelectClass = (newClassId: string) => {
		navigate(`/test-management/classes/${newClassId}`);
	};

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
		<div className="space-y-6">
			{/* Class Selector */}
			<div className="max-w-xs">
				<Label className="text-sm font-semibold block mb-2">Chọn lớp học</Label>
				{isClassesLoading ? (
					<Skeleton className="h-10 w-full" />
				) : (
					<Select value={classId || ""} onValueChange={handleSelectClass}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Chọn lớp học..." />
						</SelectTrigger>
						<SelectContent>
							{classesData?.data?.map((cls: ClassResponse) => (
								<SelectItem key={cls.id} value={cls.id}>
									{cls.name} - {cls.code}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			</div>

			{/* Class Info Card */}
			{selectedClass && !isClassesLoading && (
				<Card className="rounded-2xl border">
					<CardContent>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
							<ClassInfoCardInTestListPage info={selectedClass.subject} />
							<ClassInfoCardInTestListPage
								info={String(selectedClass.studentCount)}
							/>
							<ClassInfoCardInTestListPage
								info={String(selectedClass.testCount)}
							/>
							<ClassInfoCardInTestListPage
								info={new Date(selectedClass.createdAt).toLocaleString(
									"vi-VN",
									{
										dateStyle: "short",
										timeStyle: "short",
									},
								)}
							/>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Tests List */}
			<Card className="rounded-2xl">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-xl">Danh sách bài thi</CardTitle>
				</CardHeader>
				<CardContent className="p-6 md:p-8 space-y-6 bg-muted/10">
					{content}
				</CardContent>
			</Card>
		</div>
	);
}
