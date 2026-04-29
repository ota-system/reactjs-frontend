import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ClassCourseHeader from "@/shared/components/ClassCourseHeader";
import type { ClassDetail } from "../type";

export default function CourseHeader({
	classData,
}: {
	classData: ClassDetail | undefined;
}) {
	const navigate = useNavigate();

	return (
		<ClassCourseHeader
			classData={classData}
			backTo="/classes"
			action={
				classData
					? {
							label: "Tạo bài thi",
							icon: <Plus className="mr-2 size-4" />,
							onClick: () =>
								navigate(`/classes/${classData.id}/ai-test-generation`),
						}
					: undefined
			}
		/>
	);
}
