import { BookOpen, FileText, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/shared/stores/useAppStore";
import ClassItem from "../components/ClassItem";
import CreateClassDialog from "../components/CreateClassDialog";
import StatCard from "../components/StatCard";

const Class = () => {
	const [open, setOpen] = useState(false);
	const { setTab } = useAppStore();
	const [_form, setForm] = useState({
		name: "",
		subject: "",
	});

	const handleSubmit = () => {
		setOpen(false);
		setForm({ name: "", subject: "" });
	};

	useEffect(() => {
		setTab("classes");
	}, []);

	return (
		<div className="p-4 md:p-8 space-y-6 w-full mx-auto">
			{/* Header */}
			<div>
				<h1 className="text-2xl md:text-3xl font-semibold">Lớp học</h1>
				<p className="text-muted-foreground text-sm">Quản lý lớp học của bạn</p>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<StatCard
					title="Lớp học"
					value="2"
					desc="Lớp bạn quản lý"
					icon={<Users size={18} />}
				/>
				<StatCard
					title="Bài thi"
					value="4"
					desc="Bài thi đã tạo"
					icon={<FileText size={18} />}
				/>
				<StatCard
					title="Học sinh"
					value="5"
					desc="Tổng số học sinh"
					icon={<BookOpen size={18} />}
				/>
			</div>

			{/* Class List */}
			<Card className="rounded-2xl">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle className="text-lg">Lớp học của tôi</CardTitle>
						<p className="text-sm text-muted-foreground">
							Quản lý lớp học và tạo bài thi
						</p>
					</div>

					<Button
						onClick={() => setOpen(true)}
						className="flex items-center gap-2 px-4 py-6 cursor-pointer hover:bg-gray-500"
					>
						<Plus size={16} /> Tạo lớp
					</Button>
				</CardHeader>

				<CardContent className="space-y-4">
					<ClassItem
						title="English Advanced Level"
						teacher="Ms. Johnson"
						students="3 học sinh"
						exams="4 bài thi"
						code="ENG2026"
					/>

					<ClassItem
						title="English Intermediate"
						teacher="Ms. Johnson"
						students="2 học sinh"
						exams="0 bài thi"
						code="ENGINT26"
					/>
				</CardContent>
			</Card>

			{/* Popup (Dialog) */}
			<CreateClassDialog
				open={open}
				onOpenChange={setOpen}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default Class;
