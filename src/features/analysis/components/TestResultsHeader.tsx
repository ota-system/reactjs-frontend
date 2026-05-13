import { CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ClassDashboardData, TestDashboardData } from "../types/dashboard";
import { formatTestLabel } from "../utils/format";

interface TestResultsHeaderProps {
	classData: ClassDashboardData;
	testData: TestDashboardData | undefined;
	selectedTestId: string | undefined;
	onTestChange: (val: string) => void;
}

export default function TestResultsHeader({
	classData,
	testData,
	selectedTestId,
	onTestChange,
}: TestResultsHeaderProps) {
	const renderPlaceholderText = () => {
		if (classData.availableTests.length === 0) {
			return "chưa có bài thi";
		}

		if (testData?.testId) {
			return formatTestLabel(
				testData.testName ?? "",
				classData.availableTests.find((t) => t.id === testData.testId)
					?.createdAt ?? "",
			);
		}

		return "Chọn bài kiểm tra";
	};

	return (
		<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<CardTitle className="text-base">Kết quả bài kiểm tra</CardTitle>
			<div className="flex items-center gap-4 w-full sm:w-auto">
				<span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
					Bài thi:
				</span>
				<Select
					value={selectedTestId ?? testData?.testId ?? ""}
					onValueChange={onTestChange}
					disabled={classData.availableTests.length === 0}
				>
					<SelectTrigger className="w-full sm:w-[300px] bg-white text-left h-auto min-h-10 [&>span]:truncate [&>span]:w-full [&>span]:block">
						<SelectValue placeholder={renderPlaceholderText()} />
					</SelectTrigger>
					<SelectContent>
						{classData.availableTests.map((t) => (
							<SelectItem key={t.id} value={t.id}>
								{formatTestLabel(t.name, t.createdAt)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</CardHeader>
	);
}
