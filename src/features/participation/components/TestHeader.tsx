import type { RefObject } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import FullscreenSubmitDialog from "./FullscreenSubmitDialog";

interface TestHeaderProps {
	testName: string;
	answeredCount: number;
	totalQuestions: number;
	timeLeft: number | null;
	formatTime: (seconds: number) => string;
	progress: number;
	onSubmit: () => void;
	isSubmitting: boolean;
	submitDialogContainer?: RefObject<HTMLElement | null>;
}

export default function TestHeader({
	testName,
	answeredCount,
	totalQuestions,
	timeLeft,
	formatTime,
	progress,
	onSubmit,
	isSubmitting,
	submitDialogContainer,
}: TestHeaderProps) {
	const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

	return (
		<div className="sticky top-0 z-10 space-y-3 border bg-background p-5 shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div>
						<h1 className="text-xl font-bold text-[var(--primary-color)]">
							{testName}
						</h1>
						<p className="text-sm text-muted-foreground">
							Đã trả lời: {answeredCount}/{totalQuestions}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					{timeLeft !== null && (
						<div
							className={`rounded-lg border px-4 py-2 font-semibold tabular-nums ${
								timeLeft <= 60
									? "border-red-300 text-red-500"
									: "text-[var(--primary-color)]"
							}`}
						>
							{formatTime(timeLeft)}
						</div>
					)}

					<Button
						className="cursor-pointer px-7 py-5"
						disabled={isSubmitting}
						onClick={() => setIsSubmitDialogOpen(true)}
					>
						{isSubmitting ? "Đang nộp..." : "Nộp bài"}
					</Button>

					<FullscreenSubmitDialog
						open={isSubmitDialogOpen}
						onOpenChange={setIsSubmitDialogOpen}
						onSubmit={onSubmit}
						isSubmitting={isSubmitting}
						container={submitDialogContainer?.current}
					/>
				</div>
			</div>

			<Progress className="h-2 w-full" value={progress} id="progress-upload" />
		</div>
	);
}
