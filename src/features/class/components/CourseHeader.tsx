import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClassDetail } from "../type";
import { ClassCode } from "./ClassCode";

export default function CourseHeader({
	classData,
}: {
	classData: ClassDetail | undefined;
}) {
	const navigate = useNavigate();
	const navigateToClassesPage = () => {
		navigate("/classes");
	};

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
					onClick={navigateToClassesPage}
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

			<Button
				onClick={() => {
					navigate("/ai-test-generation");
				}}
				className="bg-black rounded-xl py-5 shadow-md mt-2 text-white font-medium hover:bg-black/90 cursor-pointer"
			>
				<Plus className="mr-2 size-4" /> Tạo bài thi
			</Button>
		</div>
	);
}
