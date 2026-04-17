import type { IconType } from "react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
		<Card className={cn("max-h-70 rounded-2xl border py-0", cardClassName)}>
			<CardHeader className="flex items-center justify-between gap-4 px-6 pt-7 pb-0">
				<CardTitle className="text-3xl font-semibold">{title}</CardTitle>
				<div
					className={cn(
						"flex size-14 items-center justify-center rounded-xl bg-[var(--secondary-background-color)]",
						iconClassName,
					)}
				>
					<Icon className="size-7" />
				</div>
			</CardHeader>
			<CardContent className="px-6 pt-14 pb-7">
				<p className={cn("text-4xl font-bold", valueClassName)}>{value}</p>
				<p
					className={cn(
						"mt-3 text-2xl text-muted-foreground",
						descriptionClassName,
					)}
				>
					{description}
				</p>
			</CardContent>
		</Card>
	);
};

export default ClassStatCard;
