import { Card, CardContent } from "@/components/ui/card";

type ClassItemProps = {
	title: string;
	value: string;
	desc: string;
	icon: React.ReactNode;
};

const ClassItem = ({ title, value, desc, icon }: ClassItemProps) => {
	return (
		<Card className="rounded-2xl">
			<CardContent className="p-4 flex flex-col justify-between h-full">
				<div className="flex items-center justify-between">
					<span className="text-sm text-muted-foreground">{title}</span>
					<div className="p-2 rounded-lg bg-muted">{icon}</div>
				</div>
				<div className="mt-4">
					<p className="text-2xl font-semibold">{value}</p>
					<p className="text-xs text-muted-foreground">{desc}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default ClassItem;
