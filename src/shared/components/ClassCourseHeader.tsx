import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClassCode } from "@/features/class/components/ClassCode";
import type { ClassDetail } from "@/features/class/type";

type ClassCourseHeaderProps = {
	classData: ClassDetail | undefined;
	backTo: string;
	action?: {
		label: string;
		icon?: React.ReactNode;
		onClick: () => void;
	};
};

export default function ClassCourseHeader({
	classData,
	backTo,
	action,
}: ClassCourseHeaderProps) {
	const navigate = useNavigate();

	if (!classData) {
		return null;
	}

	return (
		<div className="flex items-center justify-between w-full p-4">
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					size="icon"
					className="rounded-md cursor-pointer"
					onClick={() => navigate(backTo)}
				>
					<ArrowLeft className="size-4" />
				</Button>

				<div className="flex flex-col gap-1">
					<h2 className="text-2xl font-bold tracking-tight">
						{classData.name}
					</h2>

					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Badge variant="secondary" className="font-normal">
							{classData.subject}
						</Badge>
						<span>Giáo viên: {classData.teacher?.fullName}</span>
						<span className="text-muted-foreground/50">•</span>
						<ClassCode code={classData.code} />
					</div>
				</div>
			</div>

			{action ? (
				<Button
					onClick={action.onClick}
					className="bg-black rounded-xl py-5 shadow-md mt-2 text-white font-medium hover:bg-black/90 cursor-pointer"
				>
					{action.icon}
					{action.label}
				</Button>
			) : null}
		</div>
	);
}
