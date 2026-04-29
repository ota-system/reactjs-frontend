import type { ClassDetail } from "@/features/class/type";
import ClassCourseHeader from "@/shared/components/ClassCourseHeader";

export default function StudentCourseHeader({
	classData,
}: {
	classData: ClassDetail | undefined;
}) {
	return <ClassCourseHeader classData={classData} backTo="/my-classes" />;
}
