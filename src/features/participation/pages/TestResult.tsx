import { AlertTriangle } from "lucide-react";
import { MdOutlineDone } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { testSubmittedResponse } from "@/shared/data/mook";
import type { SubmitTestResult } from "../types";
import { fraudToString } from "../utils/fraudToString";

export default function TestResult() {
	const location = useLocation();
	const navigate = useNavigate();
	const testResult =
		(location.state as { testResult?: SubmitTestResult })?.testResult ??
		testSubmittedResponse;

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
							<div className="text-sm text-muted-foreground">
								{testResult.subject}
							</div>

							<div className="w-full mt-4 grid grid-cols-2 gap-4">
								<div className="border rounded-lg p-6 bg-white shadow-sm text-center">
									<div className="text-4xl font-bold">
										{testResult.score}/10
									</div>
									<div className="text-sm text-muted-foreground">Điểm số</div>
								</div>

								<div className="border rounded-lg p-6 bg-white shadow-sm text-center">
									<div className="text-4xl font-bold">
										{testResult.correctRate}%
									</div>
									<div className="text-sm text-muted-foreground">
										Tỷ lệ chính xác
									</div>
								</div>
							</div>

							<div className="w-full mt-6">
								<div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
									<div>Câu trả lời đúng</div>
									<div>
										{testResult.correctQuestions}/{testResult.totalQuestions}
									</div>
								</div>

								<Progress value={testResult.correctRate} className="h-3" />
							</div>

							{testResult.fraud.length > 0 && (
								<Alert
									variant="destructive"
									className="mt-6 bg-yellow-50 text-yellow-800 border-yellow-200"
								>
									<AlertTriangle className="size-4" />
									<AlertTitle>Cảnh báo!</AlertTitle>
									<AlertDescription>
										<span className="whitespace-pre-line">
											{fraudToString(testResult.fraud)}
										</span>
									</AlertDescription>
								</Alert>
							)}

							<div className="w-full mt-6 flex gap-4 justify-center">
								<Button
									variant="outline"
									className="px-8 h-10 cursor-pointer"
									onClick={() => {
										navigate(`/my-classes`, { replace: true });
									}}
								>
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
