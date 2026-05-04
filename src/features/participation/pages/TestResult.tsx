import { AlertTriangle } from "lucide-react";
import { MdOutlineDone } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { testSubmittedResponse } from "@/shared/data/mook";

const { score, correctRate, subject, correctQuestions, totalQuestions } =
	testSubmittedResponse;

export default function TestResult() {
	return (
		<div className="p-6">
			<div className="max-w-4xl mx-auto">
				<Card>
					<CardContent>
						<div className="flex flex-col items-center gap-4 py-6">
							<div className="size-20 rounded-full bg-muted flex items-center justify-center">
								<MdOutlineDone size={36} />
							</div>

							<h2 className="text-2xl font-semibold">Bài thi đã hoàn thành</h2>
							<div className="text-sm text-muted-foreground">{subject}</div>

							<div className="w-full mt-4 grid grid-cols-2 gap-4">
								<div className="border rounded-lg p-6 bg-white shadow-sm text-center">
									<div className="text-4xl font-bold">{score}/10</div>
									<div className="text-sm text-muted-foreground">Điểm số</div>
								</div>

								<div className="border rounded-lg p-6 bg-white shadow-sm text-center">
									<div className="text-4xl font-bold">{correctRate}%</div>
									<div className="text-sm text-muted-foreground">
										Tỷ lệ chính xác
									</div>
								</div>
							</div>

							<div className="w-full mt-6">
								<div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
									<div>Câu trả lời đúng</div>
									<div>
										{correctQuestions}/{totalQuestions}
									</div>
								</div>

								<Progress value={correctRate} className="h-3" />
							</div>

							<Alert
								variant="destructive"
								className="mt-6 bg-yellow-50 text-yellow-800 border-yellow-200"
							>
								<AlertTriangle className="size-4" />
								<AlertTitle>Cảnh báo!</AlertTitle>
								<AlertDescription>
									{/* I hard coded here, please skip this when reviewing */}
									Phát hiện 4 hành vi bất thường trong quá trình làm bài.
								</AlertDescription>
							</Alert>

							<div className="w-full mt-6 flex gap-4 justify-center">
								<Button variant="outline" className="px-8 h-10 cursor-pointer">
									Về trang chủ
								</Button>
								<Button className="px-8 h-10 cursor-pointer">
									Xem chi tiết
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
