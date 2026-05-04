import { FileText, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ClassManagementToggleProps = {
	classId: string;
	basePath: "classes" | "my-classes";
	onPrefetchExams?: () => void;
	onPrefetchStudents?: () => void;
};

export default function ClassManagementToggle({
	classId,
	basePath,
	onPrefetchExams,
	onPrefetchStudents,
}: ClassManagementToggleProps) {
	const location = useLocation();
	const active = location.pathname.includes("exams") ? "exam" : "student";

	return (
		<div className="flex max-w-sm rounded-lg bg-secondary/50 p-1 border">
			<Link
				to={`/${basePath}/${classId}/exams`}
				onMouseEnter={onPrefetchExams}
				className="flex-1"
			>
				<Button
					variant="ghost"
					className={`w-full rounded-md py-2 text-sm font-medium transition-all cursor-pointer ${
						active === "exam"
							? "bg-white shadow-sm text-black"
							: "text-muted-foreground"
					} flex items-center justify-center gap-2`}
				>
					<FileText className="size-4" />
					<span>Bài thi</span>
				</Button>
			</Link>

			<Link
				to={`/${basePath}/${classId}/students`}
				onMouseEnter={onPrefetchStudents}
				className="flex-1"
			>
				<Button
					variant="ghost"
					className={`w-full rounded-md py-2 text-sm font-medium transition-all cursor-pointer ${
						active === "student"
							? "bg-white shadow-sm text-black"
							: "text-muted-foreground"
					} flex items-center justify-center gap-2`}
				>
					<Users className="size-4" />
					<span>Học sinh</span>
				</Button>
			</Link>
		</div>
	);
}
