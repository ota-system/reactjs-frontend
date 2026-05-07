import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { QuestionResult, TestResultInfo } from "../types/detailedResult";

interface QuestionNavigatorSidebarProps {
	questionResults: QuestionResult[];
	selectedQuestionId: string | undefined;
	onSelectQuestion: (questionId: string) => void;
	info: TestResultInfo;
}

const getStatusStyle = (isCorrect: boolean | null, isSelected: boolean) => {
	const base =
		"h-12 rounded-xl text-sm font-medium transition-all border cursor-pointer";

	if (isCorrect === true) {
		return cn(
			base,
			isSelected
				? "border-[2px] border-black text-green-600"
				: "border border-green-300 text-green-600",
		);
	}
	if (isCorrect === false) {
		return cn(
			base,
			isSelected
				? "border-[2px] border-black text-red-600"
				: "border border-red-300 text-red-600",
		);
	}
	return cn(
		base,
		isSelected
			? "border-[2px] border-black bg-muted text-muted-foreground"
			: "border border-border bg-muted text-muted-foreground",
	);
};

export default function QuestionNavigatorSidebar({
	questionResults,
	selectedQuestionId,
	onSelectQuestion,
	info,
}: QuestionNavigatorSidebarProps) {
	const correctCount = questionResults.filter(
		(q) => q.isCorrect === true,
	).length;
	const progressValue = (correctCount / info.totalQuestions) * 100;

	return (
		<div className="w-72 border-l p-5 flex flex-col shrink-0">
			<div className="grid grid-cols-3 gap-3">
				{questionResults.map((q, index) => (
					<button
						key={q.questionId}
						type="button"
						onClick={() => onSelectQuestion(q.questionId)}
						className={getStatusStyle(
							q.isCorrect,
							selectedQuestionId === q.questionId,
						)}
					>
						{index + 1}
					</button>
				))}
			</div>

			<div className="mt-auto space-y-4 pt-6">
				<Progress value={progressValue} />
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">
						Tỷ lệ đúng: {progressValue}%
					</p>
					<p className="text-lg font-semibold">Điểm: {info.score}</p>
				</div>
			</div>
		</div>
	);
}
