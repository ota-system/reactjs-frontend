import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RoleSelectionProps {
	isPending: boolean;
	onSelect: (role: string) => void;
}

export function RoleSelectionForm({ isPending, onSelect }: RoleSelectionProps) {
	const [selectedRole, setSelectedRole] = useState("student");

	return (
		<div className="w-full max-w-[425px] p-6 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-card dark:border-border">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-center">Bạn là ai?</h2>
				<p className="text-sm text-muted-foreground text-center mt-2">
					Vui lòng chọn vai trò của bạn để chúng tôi tối ưu hóa trải nghiệm.
				</p>
			</div>

			<div className="grid gap-4 py-4">
				<RadioGroup
					defaultValue="student"
					onValueChange={(value) => setSelectedRole(value)}
					className="grid gap-4"
				>
					<Label
						htmlFor="teacher"
						className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-accent/50"
					>
						<RadioGroupItem value="teacher" id="teacher" />
						<div className="flex-1">
							<div className="font-bold">Giáo Viên (Teacher)</div>
						</div>
					</Label>

					<Label
						htmlFor="student"
						className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-accent/50"
					>
						<RadioGroupItem value="student" id="student" />
						<div className="flex-1">
							<div className="font-bold">Học Sinh (Student)</div>
						</div>
					</Label>
				</RadioGroup>
			</div>

			<Button
				disabled={isPending}
				className={`
					mt-2 w-full rounded-xl py-5
					text-white font-medium shadow-md
					transition
					cursor-pointer
					${
						isPending
							? "cursor-not-allowed opacity-70 bg-gray-500"
							: "bg-black hover:opacity-90"
					}
				`}
				onClick={() => onSelect(selectedRole)}
			>
				{isPending ? "Đang xử lý..." : "Xác nhận & Vào App"}
			</Button>
		</div>
	);
}
