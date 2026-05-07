import type { TestResultInfo } from "../types/detailedResult";

interface ResultHeaderProps {
	info: TestResultInfo;
}

export default function ResultHeader({ info }: ResultHeaderProps) {
	return (
		<div className="space-y-4">
			<h1 className="text-3xl font-bold tracking-tight">{info.testName}</h1>
			<div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-1 text-sm text-muted-foreground">
				<p>Giáo viên: {info.teacherName}</p>
				<p>Chủ đề: {info.topic}</p>
				<p>
					Hoàn thành:{" "}
					{new Date(info.completedAt).toLocaleDateString("vi-VN", {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
				<p>Tổng số câu: {info.totalQuestions}</p>
			</div>
			<div className="border-t-2 border-dashed border-border" />
		</div>
	);
}
