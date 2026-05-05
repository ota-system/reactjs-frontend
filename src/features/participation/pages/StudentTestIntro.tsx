import {
	AlertTriangle,
	BookOpen,
	Clock,
	Eye,
	Loader2,
	Tag,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { HttpError } from "@/shared/type";
import { useTestDetailQuery } from "../hooks/useTestDetailQuery";

export default function StudentTestIntro() {
	const { testId } = useParams<{ testId: string }>();
	const { data, isLoading, isError, error } = useTestDetailQuery(testId);
	const navigate = useNavigate();

	const testDetail = data?.data;

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Loader2 className="size-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (isError || !testDetail) {
		const err = error as unknown as HttpError | undefined;
		return (
			<div className="flex justify-center items-start min-h-screen p-4 sm:p-8 pt-8">
				<Card className="w-full max-w-3xl shadow-sm border rounded-2xl">
					<CardContent className="p-6 sm:p-8 text-center space-y-4">
						<p className="text-lg font-medium text-red-500">
							{err?.message || "Không tìm thấy bài thi"}
						</p>
						<p className="text-sm text-muted-foreground">
							{err
								? "Vui lòng thử lại sau."
								: "Bài thi không tồn tại hoặc bạn không có quyền truy cập."}
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
							{testDetail.testName}
						</h1>
						<p className="text-muted-foreground text-sm">
							Đọc kỹ hướng dẫn trước khi bắt đầu
						</p>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<Card className="shadow-none rounded-xl">
							<CardContent className="p-5 flex flex-col items-center justify-center gap-2 text-center">
								<Clock className="size-7 text-indigo-500" />
								<span className="text-2xl font-bold leading-none">
									{testDetail.duration}
								</span>
								<span className="text-sm text-muted-foreground">Phút</span>
							</CardContent>
						</Card>

						<Card className="shadow-none rounded-xl">
							<CardContent className="p-5 flex flex-col items-center justify-center gap-2 text-center">
								<BookOpen className="size-7 text-indigo-500" />
								<span className="text-2xl font-bold leading-none">
									{testDetail.totalQuestions}
								</span>
								<span className="text-sm text-muted-foreground">Câu hỏi</span>
							</CardContent>
						</Card>

						<Card className="shadow-none rounded-xl">
							<CardContent className="p-5 flex flex-col items-center justify-center gap-2 text-center">
								<Tag className="size-7 text-indigo-500" />
								<span className="text-base font-semibold leading-tight break-words">
									{testDetail.topic}
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
									{testDetail.duration} phút
								</span>{" "}
								để hoàn thành bài thi
							</li>
							<li>
								Bài thi gồm{" "}
								<span className="font-semibold text-foreground">
									{testDetail.totalQuestions} câu hỏi
								</span>
							</li>
							<li>Chọn đáp án đúng nhất cho mỗi câu hỏi</li>
						</ul>

						{testDetail.antiCheating && (
							<div className="flex items-start gap-2 text-orange-600 mt-4">
								<AlertTriangle className="size-5 shrink-0 mt-0.5" />
								<p className="text-sm">
									<span className="font-semibold">Chống gian lận:</span> Không
									chuyển tab hoặc thoát khỏi trang trong khi làm bài
								</p>
							</div>
						)}
					</div>

					<div className="bg-blue-50/50 text-blue-800 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
						<Eye className="size-5 text-blue-500 shrink-0 mt-0.5" />
						<p className="text-sm">
							<span className="font-semibold">Lưu ý:</span> Đảm bảo kết nối
							internet ổn định trong suốt bài thi
						</p>
					</div>

					<Button
						className="w-full bg-black text-white hover:bg-black/90 py-6 rounded-xl font-medium text-base cursor-pointer shadow-md"
						onClick={() => {
							navigate(`/taking-test/${testId}`);
						}}
					>
						Bắt đầu làm bài
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
