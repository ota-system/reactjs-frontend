import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassItem from "@/shared/components/ClassCardItem";
import type { ClassResponse } from "../type";

function ClassListContent({
	classes,
	isLoading,
}: {
	classes: ClassResponse[];
	isLoading: boolean;
}) {
	if (isLoading) {
		return (
			<p className="text-center py-4 text-muted-foreground">
				Đang tải danh sách lớp học...
			</p>
		);
	}
	if (classes.length === 0) {
		return (
			<div className="text-center py-8 text-muted-foreground">
				Bạn chưa quản lý lớp học nào. Hãy nhấn "Tạo lớp" để bắt đầu.
			</div>
		);
	}
	return classes.map((cls) => (
		<ClassItem
			key={cls.id}
			title={cls.name}
			teacher="Lớp của bạn"
			studentsCount={cls.studentCount}
			testsCount={cls.testCount}
			code={cls.code}
			href={`/classes/${cls.id}/tests`}
		/>
	));
}

type Props = {
	classes: ClassResponse[];
	isLoading: boolean;
	onCreateClick: () => void;
};

export default function ClassListCard({
	classes,
	isLoading,
	onCreateClick,
}: Props) {
	return (
		<Card className="rounded-2xl">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle className="text-lg">Lớp học của tôi</CardTitle>
					<p className="text-sm text-muted-foreground">
						Quản lý lớp học và tạo bài thi
					</p>
				</div>
				<Button
					onClick={onCreateClick}
					className="flex items-center gap-2 px-4 py-6 cursor-pointer hover:bg-primary/90"
				>
					<Plus size={16} /> Tạo lớp
				</Button>
			</CardHeader>

			<CardContent className="space-y-4">
				<ClassListContent classes={classes} isLoading={isLoading} />
			</CardContent>
		</Card>
	);
}
