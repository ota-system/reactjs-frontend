import { FileText, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import type { HttpError } from "@/shared/type";
import StudentExamCard from "../components/StudentExamCard";
import { useExamListQuery } from "../hooks/useExamListQuery";

export default function StudentClassExamList() {
	const { classId } = useParams<{ classId: string }>();
	const { data, isLoading, isError, error } = useExamListQuery(classId);

	const exams = data?.data ?? [];

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-16">
				<Loader2 className="size-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (isError) {
		const err = error as unknown as HttpError;
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center space-y-2">
				<p className="font-medium text-red-500">
					{err?.message || "Không thể tải danh sách bài thi"}
				</p>
				<p className="text-sm text-muted-foreground">Vui lòng thử lại sau.</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			{exams.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
					<div className="size-16 flex items-center justify-center rounded-full bg-muted">
						<FileText className="size-6 text-muted-foreground" />
					</div>
					<div>
						<p className="font-medium text-lg">Chưa có bài thi nào</p>
						<p className="text-sm text-muted-foreground">
							Giáo viên chưa tạo bài thi nào cho lớp này.
						</p>
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{exams.map((exam) => (
						<StudentExamCard key={exam.id} exam={exam} />
					))}
				</div>
			)}
		</div>
	);
}
