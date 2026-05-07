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
				<TooltipTrigger className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-base font-medium text-foreground">
					<ShieldAlert className="size-4 text-[var(--danger-border-color)]" />
				</TooltipTrigger>
				<TooltipContent className="text-sm">
					<span className="text-white-500">{antiCheatLabel} đang bật</span>
				</TooltipContent>
			</Tooltip>
		);
	}

	let topicsElement = null;
	if (topics.length > 0) {
		topicsElement = (
			<div className="mt-4 flex flex-wrap gap-2">
				{topics.map((topic) => (
					<span
						key={topic}
						className="rounded-lg bg-muted/50 border px-3 py-1 font-medium text-foreground text-sm"
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
				"rounded-2xl border flex flex-col overflow-hidden",
				className,
			)}
		>
			<CardContent className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:px-6 md:py-1 border-b border-border/50">
				<div className="min-w-0 flex-1">
					<h3 className="truncate text-xl font-semibold">{title}</h3>
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

						{antiCheatElement}
					</div>

					{topicsElement}
				</div>

				<Button
					type="button"
					onClick={onAction}
					variant="outline"
					className="h-10 px-6 text-sm font-medium hover:bg-muted cursor-pointer rounded-lg md:self-start mb-4 md:mt-0"
				>
					{actionLabel}
				</Button>
			</CardContent>

			<div className="flex items-center justify-between bg-muted/50 py-4 text-center divide-x">
				<div className="flex-1 flex flex-col items-center">
					<span className="text-xl font-bold">{stats.attempts}</span>
					<span className="text-sm text-muted-foreground mt-1">Lượt thi</span>
				</div>
				<div className="flex-1 flex flex-col items-center">
					<span className="text-xl font-bold">{stats.averageScore}</span>
					<span className="text-sm text-muted-foreground mt-1">Điểm TB</span>
				</div>
				<div className="flex-1 flex flex-col items-center">
					<span className="text-xl font-bold">{stats.highestScore}</span>
					<span className="text-sm text-muted-foreground mt-1">Cao nhất</span>
				</div>
			</div>
		</Card>
	);
};

export default TeacherTestCard;
