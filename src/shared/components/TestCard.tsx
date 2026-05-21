import { format } from "date-fns";
import { Calendar, Clock3, FileText, Play, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TestCardProps {
	title: string;
	durationMinutes: number;
	questionCount: number;
	topics: string[];
	isCheating: boolean;
	actionLabel?: string;
	onAction: () => void;
	className?: string;
	disabled?: boolean;
	startedTime?: string;
}

const TestCard = ({
	title,
	durationMinutes,
	questionCount,
	topics = [],
	isCheating = false,
	actionLabel,
	onAction,
	className,
	disabled = false,
	startedTime,
}: TestCardProps) => {
	return (
		<Card
			className={cn("rounded-xl border shadow-sm overflow-hidden", className)}
		>
			<CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between sm:p-6">
				<div className="min-w-0 flex-1">
					<h3 className="truncate text-lg md:text-xl font-semibold">{title}</h3>

					<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
						{startedTime && (
							<>
								<span className="inline-flex items-center gap-1">
									<Calendar className="size-3.5" />
									{format(new Date(startedTime), "dd/MM/yyyy HH:mm")}
								</span>
								<span className="text-muted-foreground/50">|</span>
							</>
						)}
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
						{isCheating && (
							<Tooltip>
								<TooltipTrigger asChild>
									<span className="inline-flex items-center gap-1 text-[var(--danger-text-color)]">
										<ShieldAlert className="size-3.5" />
									</span>
								</TooltipTrigger>
								<TooltipContent>
									<p>Chống gian lận</p>
								</TooltipContent>
							</Tooltip>
						)}
					</div>

					{topics.length > 0 ? (
						<div className="mt-3 flex flex-wrap gap-1.5">
							{topics.map((topic) => (
								<span
									key={topic}
									className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-[var(--primary-color)]"
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
					className="px-5 shrink-0 hover:opacity-80 cursor-pointer"
					disabled={disabled}
				>
					<Play className="size-3.5" />
					{actionLabel}
				</Button>
			</CardContent>
		</Card>
	);
};

export default TestCard;
