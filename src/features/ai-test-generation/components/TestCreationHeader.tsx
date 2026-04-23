import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TestCreationHeaderProps {
	title: string;
	subtitle: string;
	onBack?: () => void;
}

export default function TestCreationHeader({
	title,
	subtitle,
	onBack,
}: TestCreationHeaderProps) {
	return (
		<div className="flex items-start gap-4">
			<Button
				type="button"
				variant="outline"
				size="icon"
				onClick={onBack}
				aria-label="Quay lại"
				className={cn(
					"cursor-pointer",
					!onBack && "cursor-not-allowed opacity-50",
				)}
				disabled={!onBack}
				tabIndex={onBack ? 0 : -1}
			>
				<ArrowLeft className="size-5" />
			</Button>
			<div>
				<h1 className="text-3xl font-bold text-[var(--primary-color)]">
					{title}
				</h1>
				<p className="mt-1 text-lg text-muted-foreground">{subtitle}</p>
			</div>
		</div>
	);
}
