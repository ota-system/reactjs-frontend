import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ClassResponse } from "../../class/type";

interface ClassSelectionProps {
	classes: ClassResponse[];
	selectedClassId: string | undefined;
	onClassChange: (value: string) => void;
}

export default function ClassSelection({
	classes,
	selectedClassId,
	onClassChange,
}: ClassSelectionProps) {
	return (
		<div className="flex items-center gap-4 w-full sm:w-auto">
			<span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
				Lớp học:
			</span>
			<Select value={selectedClassId ?? ""} onValueChange={onClassChange}>
				<SelectTrigger className="w-full sm:w-[300px] bg-white text-left h-auto min-h-10 [&>span]:truncate [&>span]:w-full [&>span]:block">
					<SelectValue placeholder="Chọn lớp học" />
				</SelectTrigger>
				<SelectContent>
					{classes.map((cls) => (
						<SelectItem key={cls.id} value={cls.id}>
							{cls.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
