import { CheckCircle2, Target, TrendingUp, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestStudentList } from "../components/TestStudentList";

export default function TestDetail() {
	const students = [
		{
			id: "1",
			fullName: "Trần Văn Tuấn",
			warnings: 4,
			score: 0,
			maxScore: 10,
			percentage: 0,
			timeTakenMinutes: 0,
			dateTaken: "09/04/2026",
		},
	];

	return (
		<div className="space-y-6">
			{/* Overview Card */}
			<Card className="rounded-2xl border-0 shadow-sm md:border md:shadow-sm bg-white">
				<CardHeader className="px-6 py-5 md:px-8 border-b-0 pb-2">
					<CardTitle className="text-xl">Tổng quan bài thi</CardTitle>
				</CardHeader>
				<CardContent className="px-6 md:px-8 pb-8 pt-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
						{/* Total Candidates */}
						<div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm flex flex-col justify-between h-32">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-muted-foreground">
									Tổng thí sinh
								</span>
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
									<CheckCircle2 className="size-4" />
								</div>
							</div>
							<div className="text-3xl font-bold mt-2">1</div>
						</div>

						{/* Average Score */}
						<div className="rounded-xl border border-green-200 bg-white p-6 shadow-sm flex flex-col justify-between h-32">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-muted-foreground">
									Điểm TB
								</span>
								<div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-600">
									<TrendingUp className="size-4" />
								</div>
							</div>
							<div className="text-3xl font-bold mt-2">9.0</div>
						</div>

						{/* Highest Score */}
						<div className="rounded-xl border border-yellow-200 bg-white p-6 shadow-sm flex flex-col justify-between h-32">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-muted-foreground">
									Điểm cao nhất
								</span>
								<div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-100 text-yellow-600">
									<Trophy className="size-4" />
								</div>
							</div>
							<div className="text-3xl font-bold mt-2">9</div>
						</div>

						{/* Lowest Score */}
						<div className="rounded-xl border border-purple-200 bg-white p-6 shadow-sm flex flex-col justify-between h-32">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-muted-foreground">
									Điểm thấp nhất
								</span>
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
									<Target className="size-4" />
								</div>
							</div>
							<div className="text-3xl font-bold mt-2">9</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Student List Card */}
			<Card className="rounded-2xl border-0 shadow-sm md:border md:shadow-sm bg-white">
				<CardContent className="p-0 sm:p-2 md:p-6 lg:p-8">
					<TestStudentList students={students} />
				</CardContent>
			</Card>
		</div>
	);
}
