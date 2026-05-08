import { Card, CardContent } from "@/components/ui/card";

type ResultStatCardProps = {
	title: string;
	value: string;
	icon: React.ReactNode;
};

export function ResultStatCard({ title, value, icon }: ResultStatCardProps) {
	return (
		<Card>
			<CardContent className="p-4 flex items-center justify-between">
				<div className="w-full">
					<div className="flex items-center justify-between gap-2 mb-1 w-full">
						<p className="text-sm text-muted-foreground">{title}</p>
						<div className="p-2 bg-muted rounded-lg">{icon}</div>
					</div>
					<p className="text-2xl font-bold">{value}</p>
				</div>
			</CardContent>
		</Card>
	);
}
