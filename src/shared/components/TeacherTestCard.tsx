import { Clock3, FileText, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TeacherTestCardProps {
	title: string;
	durationMinutes: number;
	questionCount: number;
	topics: string[];
	antiCheatLabel: string;
	actionLabel?: string;
	onAction: () => void;
	className?: string;
	stats: {
		attempts: number;
		averageScore: number;
		highestScore: number;
	};
}

const TeacherTestCard = ({
	title,
	durationMinutes,
	questionCount,
	topics = [],
	antiCheatLabel,
	actionLabel = "Xem kết quả",
	onAction,
	className,
	stats,
}: TeacherTestCardProps) => {
	let antiCheatElement = null;
	if (antiCheatLabel) {
		antiCheatElement = (
			<Tooltip>
				<TooltipTrigger className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 font-medium text-foreground">
					<ShieldAlert className="size-3.5 text-[var(--danger-border-color)]" />
				</TooltipTrigger>
				<TooltipContent className="text-xs">
					<span className="text-white-500">{antiCheatLabel} đang bật</span>
				</TooltipContent>
			</Tooltip>
		);
	}

	let topicsElement = null;
	if (topics.length > 0) {
		topicsElement = (
			<div className="mt-3 flex flex-wrap gap-1.5">
				{topics.map((topic) => (
					<span
						key={topic}
						className="rounded-md bg-muted/50 border px-2 py-0.5 font-medium text-foreground text-xs"
					>
						{topic}
					</span>
				))}
			</div>
		);
	}

	return (
		<Card
			className={cn(
				"rounded-xl border flex flex-col overflow-hidden shadow-sm",
				className,
			)}
		>
			<CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between sm:p-6 border-b border-border/50">
				<div className="min-w-0 flex-1">
					<h3 className="truncate text-lg font-semibold">{title}</h3>
					<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
						<span className="inline-flex items-center gap-1">
							<Clock3 className="size-3.5" />
							{durationMinutes} phút
						</span>
						<span className="text-muted-foreground/50">|</span>
						<span className="inline-flex items-center gap-1">
							<FileText className="size-3.5" />
							{questionCount} câu hỏi
						</span>
						<span className="text-muted-foreground/50">|</span>
						<span>10 điểm</span>

						{antiCheatElement}
					</div>

					{topicsElement}
				</div>

				<Button
					type="button"
					onClick={onAction}
					variant="outline"
					className="px-5 shrink-0 hover:bg-muted cursor-pointer rounded-lg text-sm"
				>
					{actionLabel}
				</Button>
			</CardContent>

			<div className="flex items-center justify-between bg-muted/30 py-3 text-center divide-x divide-border/50">
				<div className="flex-1 flex flex-col items-center">
					<span className="text-lg font-bold">{stats.attempts}</span>
					<span className="text-xs text-muted-foreground mt-0.5">Lượt thi</span>
				</div>
				<div className="flex-1 flex flex-col items-center">
					<span className="text-lg font-bold">{stats.averageScore}</span>
					<span className="text-xs text-muted-foreground mt-0.5">Điểm TB</span>
				</div>
				<div className="flex-1 flex flex-col items-center">
					<span className="text-lg font-bold">{stats.highestScore}</span>
					<span className="text-xs text-muted-foreground mt-0.5">Cao nhất</span>
				</div>
			</div>
		</Card>
	);
};

export default TeacherTestCard;
