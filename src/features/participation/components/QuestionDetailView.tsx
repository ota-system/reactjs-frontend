import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { QuestionDetail } from "../types/detailedResult";

interface QuestionDetailViewProps {
	detail: QuestionDetail;
}

export default function QuestionDetailView({
	detail,
}: QuestionDetailViewProps) {
	const [showExplanation, setShowExplanation] = useState(false);

	const isMultipleChoice = detail.type === "multiple_choice";

	return (
		<div className="flex flex-col gap-5">
			{/* Question */}
			<Card className="min-h-[100px] border-2 border-dashed bg-transparent shadow-none">
				<CardContent className="p-5 text-lg font-medium">
					{detail.question}
				</CardContent>
			</Card>

			{/* Answers */}
			{isMultipleChoice ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{detail.choices.map((choice) => {
						const isStudentChoice = detail.studentOptionId === choice.id;
						const isCorrect = choice.isCorrect;

						return (
							<div
								key={choice.id}
								className={cn(
									"h-16 flex items-center px-5 rounded-md border-2 text-base",
									isCorrect && "border-green-500 text-green-600",
									!isCorrect &&
										isStudentChoice &&
										"border-red-300 text-red-500",
									!isCorrect &&
										!isStudentChoice &&
										"border-border text-foreground",
								)}
							>
								{choice.choice}
							</div>
						);
					})}
				</div>
			) : (
				<div className="space-y-3">
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							Câu trả lời của bạn
						</p>
						<div
							className={cn(
								"px-4 py-3 rounded-md border text-base",
								detail.isCorrect === true && "border-green-500 text-green-600",
								detail.isCorrect === false && "border-red-300 text-red-500",
								detail.isCorrect === null &&
									"border-yellow-300 text-yellow-600",
							)}
						>
							{detail.studentAnswer ?? "Không có câu trả lời"}
						</div>
					</div>
					{detail.answer && (
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Đáp án đúng
							</p>
							<div className="px-4 py-3 rounded-md border border-green-300 text-green-600 text-base">
								{detail.answer}
							</div>
						</div>
					)}
				</div>
			)}

			{/* Explanation Toggle */}
			{detail.explanation && (
				<>
					<div className="flex justify-start">
						<Button
							variant="outline"
							onClick={() => setShowExplanation((prev) => !prev)}
							className="gap-2 cursor-pointer"
						>
							{showExplanation ? (
								<>
									Ẩn giải thích <ChevronUp className="size-4" />
								</>
							) : (
								<>
									Xem giải thích <ChevronDown className="size-4" />
								</>
							)}
						</Button>
					</div>

					{showExplanation && (
						<Card className="border shadow-none border-green-200">
							<CardContent className="p-4 text-sm leading-relaxed text-muted-foreground">
								{detail.explanation}
							</CardContent>
						</Card>
					)}
				</>
			)}
		</div>
	);
}
