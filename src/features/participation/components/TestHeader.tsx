import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import ConfirmedDialog from "@/shared/components/ConfirmedDialog";

interface TestHeaderProps {
	testName: string;
	answeredCount: number;
	totalQuestions: number;
	timeLeft: number | null;
	formatTime: (seconds: number) => string;
	progress: number;
	onSubmit: () => void;
}

export default function TestHeader({
	testName,
	answeredCount,
	totalQuestions,
	timeLeft,
	formatTime,
	progress,
	onSubmit,
}: TestHeaderProps) {
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

					<Dialog>
						<DialogTrigger asChild>
							<Button className="cursor-pointer px-7 py-5">Nộp bài</Button>
						</DialogTrigger>
						<ConfirmedDialog
							title="Nộp bài"
							description="Bạn có chắc muốn nộp bài? Hành động này không thể hoàn tác."
							actionLabel="Nộp bài"
							actionVariant="default"
							action={onSubmit}
							secondaryAction={{
								label: "Hủy",
								action: () => {},
								variant: "outline",
							}}
						/>
					</Dialog>
				</div>
			</div>

			<Progress className="h-2 w-full" value={progress} id="progress-upload" />
		</div>
	);
}
