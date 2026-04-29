import {
	AlertTriangle,
	BookOpen,
	Clock,
	Eye,
	Loader2,
	Tag,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useExamDetailQuery } from "../hooks/useExamDetailQuery";

export default function StudentExamIntro() {
	const { examId } = useParams<{ examId: string }>();
	const { data, isLoading, isError } = useExamDetailQuery(examId);

	const examDetail = data?.data;

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (isError || !examDetail) {
		return (
			<div className="flex justify-center items-start min-h-screen p-4 sm:p-8 pt-8">
				<Card className="w-full max-w-3xl shadow-sm border rounded-2xl">
					<CardContent className="p-6 sm:p-8 text-center space-y-4">
						<p className="text-lg font-medium text-red-500">
							Không tìm thấy bài thi
						</p>
						<p className="text-sm text-muted-foreground">
							Bài thi không tồn tại hoặc bạn không có quyền truy cập.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-start min-h-screen p-4 sm:p-8 pt-8">
			<Card className="w-full max-w-3xl shadow-sm border rounded-2xl">
				<CardContent className="p-6 sm:p-8 space-y-8">
					<div className="space-y-2">
						<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
							{examDetail.testName}
						</h1>
						<p className="text-muted-foreground text-sm">
							Đọc kỹ hướng dẫn trước khi bắt đầu
						</p>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<Card className="shadow-none rounded-xl">
							<CardContent className="p-5 flex flex-col items-center justify-center gap-2 text-center">
								<Clock className="w-7 h-7 text-indigo-500" />
								<span className="text-2xl font-bold leading-none">
									{examDetail.duration}
								</span>
								<span className="text-sm text-muted-foreground">Phút</span>
							</CardContent>
						</Card>

						<Card className="shadow-none rounded-xl">
							<CardContent className="p-5 flex flex-col items-center justify-center gap-2 text-center">
								<BookOpen className="w-7 h-7 text-indigo-500" />
								<span className="text-2xl font-bold leading-none">
									{examDetail.totalQuestions}
								</span>
								<span className="text-sm text-muted-foreground">Câu hỏi</span>
							</CardContent>
						</Card>

						<Card className="shadow-none rounded-xl">
							<CardContent className="p-5 flex flex-col items-center justify-center gap-2 text-center">
								<Tag className="w-7 h-7 text-indigo-500" />
								<span className="text-base font-semibold leading-tight break-words">
									{examDetail.topic}
								</span>
								<span className="text-sm text-muted-foreground">Chủ đề</span>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-4">
						<h3 className="font-semibold text-lg">Hướng dẫn:</h3>
						<ul className="space-y-3 text-sm text-muted-foreground ml-4 list-disc marker:text-indigo-500">
							<li>
								Bạn có{" "}
								<span className="font-semibold text-foreground">
									{examDetail.duration} phút
								</span>{" "}
								để hoàn thành bài thi
							</li>
							<li>
								Bài thi gồm{" "}
								<span className="font-semibold text-foreground">
									{examDetail.totalQuestions} câu hỏi
								</span>
							</li>
							<li>Chọn đáp án đúng nhất cho mỗi câu hỏi</li>
						</ul>

						{examDetail.antiCheating && (
							<div className="flex items-start gap-2 text-orange-600 mt-4">
								<AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
								<p className="text-sm">
									<span className="font-semibold">Chống gian lận:</span> Không
									chuyển tab hoặc thoát khỏi trang trong khi làm bài
								</p>
							</div>
						)}
					</div>

					<div className="bg-blue-50/50 text-blue-800 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
						<Eye className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
						<p className="text-sm">
							<span className="font-semibold">Lưu ý:</span> Đảm bảo kết nối
							internet ổn định trong suốt bài thi
						</p>
					</div>

					<Button className="w-full bg-black text-white hover:bg-black/90 py-6 rounded-xl font-medium text-base cursor-pointer shadow-md">
						Bắt đầu làm bài
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
