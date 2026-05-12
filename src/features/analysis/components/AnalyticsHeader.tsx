import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ApiResponse } from "@/shared/type";
import type { ClassResponse } from "../../class/type";

interface AnalyticsHeaderProps {
	classes: ApiResponse<ClassResponse[]> | undefined;
	selectedClassId: string | undefined;
	onClassChange: (val: string) => void;
}

export default function AnalyticsHeader({
	classes,
	selectedClassId,
	onClassChange,
}: AnalyticsHeaderProps) {
	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<h1 className="text-2xl font-bold">Phân tích học tập</h1>
			<div className="flex items-center gap-4 w-full sm:w-auto">
				<span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
					Chọn lớp:
				</span>
				<Select value={selectedClassId} onValueChange={onClassChange}>
					<SelectTrigger className="w-full sm:w-[300px] bg-white text-left h-auto min-h-10 [&>span]:truncate [&>span]:w-full [&>span]:block">
						<SelectValue placeholder="Chọn lớp học" />
					</SelectTrigger>
					<SelectContent>
						{classes?.data?.map((cls) => (
							<SelectItem key={cls.id} value={cls.id}>
								{cls.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
