import { Edit, Save } from "lucide-react";
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
import type { TestInformationValues } from "../interfaces/TestInformation";
import ToggleRow from "./ToggleRow";

interface TestInformationPanelProps {
	values: TestInformationValues;
	onFieldChange: (
		field: keyof TestInformationValues,
		value: string | boolean,
	) => void;
	onCancel: () => void;
	onSave: () => void;
	isSaving?: boolean;
	showButtons?: boolean;
	disableFields?: boolean;
	onEdit?: () => void;
	showEditIcon?: boolean;
	isOnModal?: boolean;
}

const TestInformationPanel = ({
	values,
	onFieldChange,
	onCancel,
	onSave,
	isSaving = false,
	showButtons = true,
	disableFields = false,
	onEdit,
	showEditIcon = false,
	isOnModal = false,
}: TestInformationPanelProps) => {
	const saveButtonLabel = isOnModal ? "Lưu thay đổi" : "Lưu bài thi";
	return (
		<div className="space-y-6">
			<Card className="rounded-2xl border py-0">
				{onEdit && (
					<CardHeader className="px-6 pt-6 pb-0 md:px-8">
						<div className="flex items-start justify-between gap-4">
							<div>
								<CardTitle className="text-2xl font-semibold">
									Thông tin bài thi
								</CardTitle>
								<CardDescription className="text-lg">
									Cấu hình thông tin và thời gian bài thi
								</CardDescription>
							</div>
							{showEditIcon && (
								<div className="flex items-center">
									<Button
										type="button"
										variant="ghost"
										onClick={onEdit}
										aria-label="Chỉnh sửa thông tin bài thi"
										className="size-8 p-0 cursor-pointer"
									>
										<Edit className="size-4" />
									</Button>
								</div>
							)}
						</div>
					</CardHeader>
				)}

				<CardContent className="space-y-6 px-6 pt-6 pb-8 md:px-8">
					<div className="space-y-2">
						<p className="text-base font-medium">Tên bài thi *</p>
						<Input
							value={values.title}
							onChange={(event) => onFieldChange("title", event.target.value)}
							placeholder="Nhập tên bài thi"
							className="h-11"
							disabled={disableFields}
						/>
					</div>

					<div className="space-y-2">
						<p className="text-base font-medium">Chủ đề *</p>
						<Input
							value={values.topic}
							onChange={(event) => onFieldChange("topic", event.target.value)}
							placeholder="Nhập chủ đề bài thi"
							className="h-11"
							disabled={disableFields}
						/>
					</div>

					<div className="space-y-2">
						<p className="text-base font-medium">Thời gian bắt đầu làm bài</p>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							<div className="space-y-2">
								<p className="text-base text-muted-foreground">Ngày</p>
								<Input
									type="date"
									value={values.publishNow ? "" : values.startDate}
									onChange={(event) =>
										onFieldChange("startDate", event.target.value)
									}
									className="h-11"
									disabled={values.publishNow || disableFields}
								/>
							</div>
							<div className="space-y-2">
								<p className="text-base text-muted-foreground">Giờ</p>
								<Input
									type="time"
									value={values.publishNow ? "" : values.startTime}
									onChange={(event) =>
										onFieldChange("startTime", event.target.value)
									}
									className="h-11"
									disabled={values.publishNow || disableFields}
								/>
							</div>
						</div>
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
								disabled={disableFields}
							/>
						</div>
						<div className="space-y-2">
							<p className="text-base font-medium">
								Tổng điểm (Giá trị điểm của từng câu là như nhau)
							</p>
							<Input
								type="number"
								min={1}
								value={values.totalScore}
								disabled={true}
								className="h-11 font-bold"
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
							disabled={disableFields}
						/>
						{!disableFields && !isOnModal && (
							<ToggleRow
								title="Xuất bản ngay"
								description="Học sinh có thể thấy bài thi ngay sau khi lưu"
								checked={values.publishNow!}
								onToggle={(value) => onFieldChange("publishNow", value)}
							/>
						)}
					</div>
				</CardContent>
			</Card>

			{showButtons && (
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
						{isSaving ? "Đang lưu..." : saveButtonLabel}
					</Button>
				</div>
			)}
		</div>
	);
};

export default TestInformationPanel;
