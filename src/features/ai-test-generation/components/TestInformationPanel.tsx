import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ToggleRow from "./ToggleRow";

export interface TestInformationValues {
	title: string;
	startDate: string;
	startTime: string;
	durationMinutes: string;
	totalScore: string;
	antiCheatEnabled: boolean;
	publishNow: boolean;
}

interface TestInformationPanelProps {
	values: TestInformationValues;
	onFieldChange: (
		field: keyof TestInformationValues,
		value: string | boolean,
	) => void;
	onCancel: () => void;
	onSave: () => void;
	isSaving?: boolean;
}

const TestInformationPanel = ({
	values,
	onFieldChange,
	onCancel,
	onSave,
	isSaving = false,
}: TestInformationPanelProps) => {
	return (
		<div className="space-y-6">
			<Card className="rounded-2xl border py-0">
				<CardHeader className="px-6 pt-6 pb-0 md:px-8">
					<CardTitle className="text-2xl font-semibold">
						Thông tin bài thi
					</CardTitle>
					<CardDescription className="text-lg">
						Cấu hình thông tin và thời gian bài thi
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-6 px-6 pt-6 pb-8 md:px-8">
					<div className="space-y-2">
						<p className="text-base font-medium">Tên bài thi *</p>
						<Input
							value={values.title}
							onChange={(event) => onFieldChange("title", event.target.value)}
							placeholder="Nhập tên bài thi"
							className="h-11"
						/>
					</div>

					<div className="space-y-2">
						<p className="text-base font-medium">Thời gian bắt đầu làm bài</p>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							<div className="space-y-2">
								<p className="text-base text-muted-foreground">Ngày</p>
								<Input
									type="date"
									value={values.startDate}
									onChange={(event) =>
										onFieldChange("startDate", event.target.value)
									}
									className="h-11"
								/>
							</div>
							<div className="space-y-2">
								<p className="text-base text-muted-foreground">Giờ</p>
								<Input
									type="time"
									value={values.startTime}
									onChange={(event) =>
										onFieldChange("startTime", event.target.value)
									}
									className="h-11"
								/>
							</div>
						</div>
						<p className="text-base text-muted-foreground">
							Để trống nếu muốn học sinh có thể làm bài ngay lập tức
						</p>
					</div>

					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						<div className="space-y-2">
							<p className="text-base font-medium">
								Thời gian làm bài (phút) *
							</p>
							<Input
								type="number"
								min={1}
								value={values.durationMinutes}
								onChange={(event) =>
									onFieldChange("durationMinutes", event.target.value)
								}
								className="h-11"
							/>
						</div>
						<div className="space-y-2">
							<p className="text-base font-medium">Tổng điểm</p>
							<Input
								type="number"
								min={1}
								value={values.totalScore}
								onChange={(event) =>
									onFieldChange("totalScore", event.target.value)
								}
								className="h-11"
							/>
						</div>
					</div>

					<Separator />

					<div className="space-y-4">
						<ToggleRow
							title="Chống gian lận"
							description="Giám sát chuyển tab và thời gian làm bài"
							checked={values.antiCheatEnabled}
							onToggle={(value) => onFieldChange("antiCheatEnabled", value)}
						/>
						<ToggleRow
							title="Xuất bản ngay"
							description="Học sinh có thể thấy bài thi ngay sau khi lưu"
							checked={values.publishNow}
							onToggle={(value) => onFieldChange("publishNow", value)}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-end gap-3">
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					className="cursor-pointer"
				>
					Hủy
				</Button>
				<Button
					type="button"
					onClick={onSave}
					disabled={isSaving}
					className="cursor-pointer"
				>
					<Save className="size-4" />
					{isSaving ? "Đang lưu..." : "Lưu bài thi"}
				</Button>
			</div>
		</div>
	);
};

export default TestInformationPanel;
