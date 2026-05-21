import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	DETAILED_RESULT_COLORS,
	DETAILED_RESULT_COMMON_CLASSES,
} from "../constants/detailedResultStyles";
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
			<Card className="min-h-[100px] border-3 mb-8">
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
									DETAILED_RESULT_COMMON_CLASSES.ANSWER_ITEM,
									isCorrect &&
										`${DETAILED_RESULT_COLORS.CORRECT.BORDER} ${DETAILED_RESULT_COLORS.CORRECT.TEXT}`,
									!isCorrect &&
										isStudentChoice &&
										`${DETAILED_RESULT_COLORS.INCORRECT.BORDER} ${DETAILED_RESULT_COLORS.INCORRECT.TEXT}`,
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
								DETAILED_RESULT_COMMON_CLASSES.ANSWER_INPUT,
								detail.isCorrect === true &&
									`${DETAILED_RESULT_COLORS.CORRECT.BORDER} ${DETAILED_RESULT_COLORS.CORRECT.TEXT}`,
								detail.isCorrect === false &&
									`${DETAILED_RESULT_COLORS.INCORRECT.BORDER} ${DETAILED_RESULT_COLORS.INCORRECT.TEXT}`,
								detail.isCorrect === null &&
									`${DETAILED_RESULT_COLORS.PENDING.BORDER} ${DETAILED_RESULT_COLORS.PENDING.TEXT}`,
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
							<div
								className={cn(
									DETAILED_RESULT_COMMON_CLASSES.ANSWER_INPUT,
									`${DETAILED_RESULT_COLORS.CORRECT.BORDER_LIGHT} ${DETAILED_RESULT_COLORS.CORRECT.TEXT}`,
								)}
							>
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
						<Card className="border shadow-none border-green-600">
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
