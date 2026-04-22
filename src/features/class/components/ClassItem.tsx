import { FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type ClassItemProps = {
	id: string;
	title: string;
	teacher: string;
	studentsCount: number;
	examsCount: number;
	code: string;
};

const ClassItem = ({
	id,
	title,
	teacher,
	studentsCount,
	examsCount,
	code,
}: ClassItemProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/classes/${id}/exams-list`);
	};
	return (
		// biome-ignore lint: a11y/useKeyWithClickEvents
		<div
			role="button"
			tabIndex={0}
			onClick={handleClick}
			className="border rounded-2xl px-5 py-4 flex flex-col gap-3 hover:bg-muted/30 transition cursor-pointer"
		>
			<div className="space-y-1">
				<h3 className="font-semibold text-base">{title}</h3>

				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Badge variant="secondary" className="px-2 py-0.5 text-xs">
						English
					</Badge>
					<span>• Giáo viên: {teacher || "Chưa có thông tin"}</span>
				</div>
			</div>

			{/* Bottom row */}
			<div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
				<div className="flex items-center gap-5">
					<span className="flex items-center gap-1.5">
						<Users size={15} />
						{studentsCount || 0} học sinh
					</span>
					<span className="flex items-center gap-1.5">
						<FileText size={15} />
						{examsCount || 0} bài thi
					</span>
				</div>

				<span className="px-2 py-1 rounded-md bg-muted text-foreground text-xs font-medium">
					Mã: {code}
				</span>
			</div>
		</div>
	);
};

export default ClassItem;
