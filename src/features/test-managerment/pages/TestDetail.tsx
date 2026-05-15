import {
	CheckCircle2,
	type LucideIcon,
	Target,
	TrendingUp,
	Trophy,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TestStudentList } from "../components/TestStudentList";
import { useTestStudentsQuery } from "../hooks/useTestStudentsQuery";
import { useTestSummaryQuery } from "../hooks/useTestSummaryQuery";

const LIMIT = 10;

export default function TestDetail() {
	const { testId } = useParams<{ testId: string }>();
	const [page, setPage] = useState(1);

	const { data: summary, isLoading: isSummaryLoading } = useTestSummaryQuery(
		testId || "",
	);
	const {
		data: studentData,
		isLoading: isStudentsLoading,
		isFetching: isStudentsFetching,
	} = useTestStudentsQuery(testId || "", page, LIMIT);

	const students = studentData?.data ?? [];
	const metadata = studentData?.metadata;
	const totalPages = metadata?.totalPages ?? 1;

	const renderStat = (
		label: string,
		value: string | number | undefined,
		Icon: LucideIcon,
		colorClass: string,
		skeletonWidth: string,
	) => {
		let displayValue = null;
		if (isSummaryLoading) {
			displayValue = <Skeleton className={cn("h-9", skeletonWidth)} />;
		} else {
			displayValue = value ?? 0;
		}
		const colorMap: Record<string, string> = {
			blue: "border-blue-200 bg-blue-100 text-blue-600",
			green: "border-green-200 bg-green-100 text-green-600",
			yellow: "border-yellow-200 bg-yellow-100 text-yellow-600",
			purple: "border-purple-200 bg-purple-100 text-purple-600",
		};
		const theme = colorMap[colorClass] || colorMap.blue;
		const [borderColor] = theme.split(" ");
		return (
			<div
				className={cn(
					"rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between h-32",
					borderColor,
				)}
			>
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-muted-foreground">
						{label}
					</span>
					<div
						className={cn(
							"flex size-8 items-center justify-center rounded-md",
							theme.split(" ").slice(1).join(" "),
						)}
					>
						<Icon className="size-4" />
					</div>
				</div>
				<div className="text-3xl font-bold mt-2">{displayValue}</div>
			</div>
		);
	};

	let studentListContent = null;
	if (isStudentsLoading) {
		studentListContent = (
			<div className="space-y-4 p-4">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-20 w-full" />
				<Skeleton className="h-20 w-full" />
			</div>
		);
	} else {
		studentListContent = (
			<TestStudentList
				students={students}
				page={page}
				totalPages={totalPages}
				onPageChange={setPage}
				isLoading={isStudentsFetching}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<Card className="rounded-2xl border-0 shadow-sm md:border md:shadow-sm bg-white">
				<CardHeader className="px-6 py-5 md:px-8 border-b-0 pb-2">
					<CardTitle className="text-xl">Tổng quan bài thi</CardTitle>
				</CardHeader>
				<CardContent className="px-6 md:px-8 pb-8 pt-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
						{renderStat(
							"Tổng thí sinh",
							summary?.totalStudents,
							CheckCircle2,
							"blue",
							"w-12",
						)}
						{renderStat(
							"Điểm TB",
							summary?.averageScore?.toFixed(1),
							TrendingUp,
							"green",
							"w-16",
						)}
						{renderStat(
							"Điểm cao nhất",
							summary?.highestScore,
							Trophy,
							"yellow",
							"w-12",
						)}
						{renderStat(
							"Điểm thấp nhất",
							summary?.lowestScore,
							Target,
							"purple",
							"w-12",
						)}
					</div>
				</CardContent>
			</Card>

			<Card className="rounded-2xl border-0 shadow-sm md:border md:shadow-sm bg-white">
				<CardContent className="p-0 sm:p-2 md:p-6 lg:p-8">
					{studentListContent}
				</CardContent>
			</Card>
		</div>
	);
}
