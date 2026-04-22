import { useQueryClient } from "@tanstack/react-query";
import { FileText, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchClassStudents } from "../services/classService";

// import { fetchClassExams } from "../services/class.api"; // For when exams API is ready

type Props = {
	classId: string;
};

const ManagementToggle = ({ classId }: Props) => {
	const location = useLocation();
	const queryClient = useQueryClient();

	// Determine active state from URL
	const active = location.pathname.includes("exams") ? "exam" : "student";
	// prefetch incuming
	const prefetchExams = () => {
		// queryClient.prefetchQuery({
		// 	queryKey: ['class-exams', classId],
		// 	queryFn: () => fetchClassExams(classId),
		// });
	};

	const prefetchStudents = () => {
		queryClient.prefetchQuery({
			queryKey: ["class-students", classId],
			queryFn: () => fetchClassStudents(classId),
		});
	};

	return (
		<div className="flex max-w-sm rounded-lg bg-secondary/50 p-1 border">
			<Link
				to={`/classes/${classId}/exams`}
				onMouseEnter={prefetchExams}
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
				to={`/classes/${classId}/students`}
				onMouseEnter={prefetchStudents}
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
};

export default ManagementToggle;
