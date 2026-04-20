import { ArrowLeft, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClassCode } from "./ClassCode";

export default function CourseHeader() {
	return (
		<div className="flex items-center justify-between w-full p-4">
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					size="icon"
					className="rounded-md cursor-pointer"
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>

				<div className="flex flex-col gap-1">
					<h2 className="text-2xl font-bold tracking-tight">
						English Advanced Level
					</h2>

					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Badge variant="secondary" className="font-normal">
							English
						</Badge>
						<span>Giáo viên: Ms. Johnson</span>
						<span className="text-muted-foreground/50">•</span>
						<ClassCode code="ENG2026" />
					</div>
				</div>
			</div>

			<Button className="bg-black rounded-xl py-5 shadow-md mt-2 text-white font-medium hover:bg-black/90 cursor-pointer">
				<Plus className="mr-2 h-4 w-4" /> Tạo bài thi
			</Button>
		</div>
	);
}
