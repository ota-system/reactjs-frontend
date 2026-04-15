import { Clock3, FileText, Play, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExamCardProps {
	title: string;
	durationMinutes: number;
	questionCount: number;
	topics: string[];
	antiCheatLabel: string;
	actionLabel?: string;
	onAction: () => void;
	className?: string;
}

const ExamCard = ({
	title,
	durationMinutes,
	questionCount,
	topics = [],
	antiCheatLabel,
	actionLabel,
	onAction,
	className,
}: ExamCardProps) => {
	return (
		<Card
			className={cn(
				"rounded-2xl border py-0 md:max-h-50 sm:max-h-60 max-h-80",
				className,
			)}
		>
			<CardContent className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-start md:justify-between md:px-8 md:py-7">
				<div className="min-w-0 flex-1">
					<h3 className="truncate text-2xl font-semibold">{title}</h3>

					<div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground">
						<span className="inline-flex items-center gap-1.5 text-lg">
							<Clock3 className="size-4" />
							{durationMinutes} phút
						</span>
						<span className="text-base">|</span>
						<span className="inline-flex items-center gap-1.5 text-lg">
							<FileText className="size-4" />
							{questionCount} câu hỏi
						</span>
						<span>|</span>
						<span className="text-lg">10 điểm</span>
						{antiCheatLabel ? (
							<span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--danger-border-color)] bg-[var(--danger-bg-color)] px-2 py-1 text-base font-medium text-[var(--danger-text-color)]">
								<ShieldAlert className="size-4" />
								{antiCheatLabel}
							</span>
						) : null}
					</div>

					{topics.length > 0 ? (
						<div className="mt-4 flex flex-wrap gap-2">
							{topics.map((topic) => (
								<span
									key={topic}
									className="rounded-lg bg-muted px-3 py-1 font-medium text-[var(--primary-color)]"
								>
									{topic}
								</span>
							))}
						</div>
					) : null}
				</div>

				<Button
					type="button"
					onClick={onAction}
					className="h-12 px-6 text-lg font-medium hover:opacity-80 cursor-pointer"
				>
					<Play className="size-4" />
					{actionLabel}
				</Button>
			</CardContent>
		</Card>
	);
};

export default ExamCard;
