import { FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = {
	active: "exam" | "student";
};

const ManagementToggle = ({ active }: Props) => {
	const navigate = useNavigate();
	const onChange = (value: "exam" | "student") => {
		navigate(value === "exam" ? "/teacher/exam-list" : "/teacher/student-list");
	};

	return (
		<div className="flex max-w-sm rounded-lg bg-secondary/50 p-1 border">
			<Button
				variant="ghost"
				onClick={() => onChange("exam")}
				className={`flex-1 rounded-md py-2 text-sm font-medium transition-all cursor-pointer ${
					active === "exam"
						? "bg-white shadow-sm text-black"
						: "text-muted-foreground"
				} flex items-center justify-center gap-2`}
			>
				<FileText className="h-4 w-4" />
				<span>Bài thi</span>
			</Button>

			<Button
				variant="ghost"
				onClick={() => onChange("student")}
				className={`flex-1 rounded-md py-2 text-sm font-medium transition-all cursor-pointer ${
					active === "student"
						? "bg-white shadow-sm text-black"
						: "text-muted-foreground"
				} flex items-center justify-center gap-2`}
			>
				<Users className="h-4 w-4" />
				<span>Học sinh</span>
			</Button>
		</div>
	);
};

export default ManagementToggle;
