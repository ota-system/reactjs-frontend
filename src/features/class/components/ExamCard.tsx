import { Clock, FileText, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ExamCardProps } from "../type";

export function ExamCard({
	title,
	duration,
	questionCount,
	totalPoints,
	tags,
	stats,
}: ExamCardProps) {
	return (
		<Card className="w-full border-[#E5E7EB] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white overflow-hidden">
			<CardHeader className="flex flex-row justify-between items-start space-y-0 p-6 pb-5">
				<div className="flex-1 space-y-4">
					<h3 className="text-[20px] font-semibold text-[#111827] leading-tight">
						{title}
					</h3>

					<div className="flex flex-wrap items-center gap-x-2 text-[14px] text-[#6B7280]">
						<span className="flex items-center gap-1.5">
							<Clock className="size-4 text-[#9CA3AF]" /> {duration} phút
						</span>
						<span className="text-[#D1D5DB] text-[10px]">●</span>
						<span className="flex items-center gap-1.5">
							<FileText className="size-4 text-[#9CA3AF]" /> {questionCount} câu
							hỏi
						</span>
						<span className="text-[#D1D5DB] text-[10px]">●</span>
						<span className="flex items-center gap-1.5">
							{totalPoints} điểm
						</span>
						<span className="text-[#D1D5DB] text-[10px]">●</span>

						<Badge
							variant="outline"
							className="font-normal text-[#4B5563] border-[#E5E7EB] bg-white px-2 py-0.5 rounded-lg gap-1.5 shadow-sm"
						>
							<ShieldAlert className="size-3.5 text-[#6B7280]" /> Chống gian lận
						</Badge>
					</div>

					<div className="flex gap-2">
						{tags.map((tag) => (
							<Badge
								key={tag}
								className="bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] font-medium px-3 py-1 rounded-lg border-none shadow-none"
							>
								{tag}
							</Badge>
						))}
					</div>
				</div>

				<Button
					variant="outline"
					className="border-[#E5E7EB] text-[#111827] px-5 h-11 rounded-xl font-medium hover:bg-gray-50 transition-all ml-4"
				>
					Xem kết quả
				</Button>
			</CardHeader>

			<CardContent className="px-3 pb-3">
				<div className="bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6] border border-[#F3F4F6] rounded-[20px] py-8 grid grid-cols-3">
					<div className="flex flex-col items-center justify-center space-y-1">
						<div className="text-[28px] font-bold text-[#111827] tracking-tight">
							{stats.attempts}
						</div>
						<div className="text-[13px] font-medium text-[#9CA3AF]">
							Lượt thi
						</div>
					</div>
					<div className="flex flex-col items-center justify-center space-y-1 border-x border-[#E5E7EB]/50">
						<div className="text-[28px] font-bold text-[#111827] tracking-tight">
							{stats.avgScore}%
						</div>
						<div className="text-[13px] font-medium text-[#9CA3AF]">
							Điểm TB
						</div>
					</div>
					<div className="flex flex-col items-center justify-center space-y-1">
						<div className="text-[28px] font-bold text-[#111827] tracking-tight">
							{stats.highestScore}%
						</div>
						<div className="text-[13px] font-medium text-[#9CA3AF]">
							Cao nhất
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
