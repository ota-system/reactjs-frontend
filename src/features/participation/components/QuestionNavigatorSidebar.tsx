import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
	DETAILED_RESULT_COLORS,
	DETAILED_RESULT_COMMON_CLASSES,
} from "../constants/detailedResultStyles";
import type { QuestionResult, TestResultInfo } from "../types/detailedResult";

interface QuestionNavigatorSidebarProps {
	questionResults: QuestionResult[];
	selectedQuestionId: string | undefined;
	onSelectQuestion: (questionId: string) => void;
	info: TestResultInfo;
}

const getStatusStyle = (isCorrect: boolean | null, isSelected: boolean) => {
	const base = DETAILED_RESULT_COMMON_CLASSES.NAV_BUTTON_BASE;

	if (isCorrect === true) {
		return cn(
			base,
			isSelected
				? `border-[2px] border-black ${DETAILED_RESULT_COLORS.CORRECT.TEXT}`
				: `${DETAILED_RESULT_COLORS.CORRECT.BORDER_LIGHT} ${DETAILED_RESULT_COLORS.CORRECT.TEXT}`,
		);
	}
	if (isCorrect === false) {
		return cn(
			base,
			isSelected
				? `border-[2px] border-black ${DETAILED_RESULT_COLORS.INCORRECT.TEXT_NAV}`
				: `${DETAILED_RESULT_COLORS.INCORRECT.BORDER} ${DETAILED_RESULT_COLORS.INCORRECT.TEXT_NAV}`,
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
	const progressValue = info.correctRate;

	return (
		<div
			className={cn(
				DETAILED_RESULT_COMMON_CLASSES.SIDEBAR_CONTAINER,
				"flex flex-col shrink-0",
			)}
		>
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
						Tỷ lệ đúng: {info.correctRate}%
					</p>
					<p className="text-lg font-semibold">Điểm: {info.score}</p>
				</div>
			</div>
		</div>
	);
}
