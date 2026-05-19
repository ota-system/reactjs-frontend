import type { IconType } from "react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ClassStatCardProps {
	title: string;
	value: number | string;
	description: string;
	icon: IconType;
	iconLabel?: string;
	iconClassName?: string;
	valueClassName?: string;
	descriptionClassName?: string;
	cardClassName?: string;
}

const ClassStatCard = ({
	title,
	value,
	description,
	icon: Icon,
	iconClassName,
	valueClassName,
	descriptionClassName,
	cardClassName,
}: ClassStatCardProps) => {
	return (
		<Card className={cn("rounded-2xl", cardClassName)}>
			<CardContent className="p-4 flex flex-col justify-between h-full">
				{/* Header */}
				<div className="flex items-center justify-between">
					<span className="text-lg font-bold">{title}</span>

					<div className={cn("p-2 rounded-lg bg-muted", iconClassName)}>
						<Icon className="size-4" />
					</div>
				</div>

				{/* Content */}
				<div className="mt-4">
					<p className={cn("text-2xl font-semibold", valueClassName)}>
						{value}
					</p>
					<p
						className={cn(
							"text-xs text-muted-foreground",
							descriptionClassName,
						)}
					>
						{description}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default ClassStatCard;
