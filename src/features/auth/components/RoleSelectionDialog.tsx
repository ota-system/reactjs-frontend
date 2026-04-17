import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RoleSelectionProps {
	isOpen: boolean;
	onSelect: (role: string) => void;
}

export function RoleSelectionDialog({ isOpen, onSelect }: RoleSelectionProps) {
	const [selectedRole, setSelectedRole] = useState("STUDENT");

	return (
		<Dialog open={isOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Bạn là ai?</DialogTitle>
					<DialogDescription>
						Vui lòng chọn vai trò của bạn để chúng tôi tối ưu hóa trải nghiệm.
					</DialogDescription>
				</DialogHeader>

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

				<DialogFooter>
					<Button className="w-full" onClick={() => onSelect(selectedRole)}>
						Xác nhận & Vào App
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
