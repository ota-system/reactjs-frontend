import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
	previewCode?: string;
	classPreview?: any;
	isLoading: boolean;
	isError: boolean;
	isJoining: boolean;
	onBack: () => void;
	onConfirm: () => void;
}

const ClassPreviewSection = ({
	previewCode,
	classPreview,
	isLoading,
	isError,
	isJoining,
	onBack,
	onConfirm,
}: Props) => {
	return (
		<div className="flex flex-col gap-4 mt-2">
			{isLoading ? (
				<div className="flex flex-col gap-3">
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-3 w-1/2" />
					<Skeleton className="h-3 w-full" />
				</div>
			) : isError || !classPreview ? (
				<div className="text-center py-4">
					<p className="text-sm text-red-500">
						Không tìm thấy lớp với mã{" "}
						<span className="font-semibold">{previewCode}</span>
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-3">
					<div>
						<p className="font-semibold text-sm">
							Tên lớp: {classPreview.name}
						</p>
					</div>

					<Separator />

					<div className="flex items-center justify-between text-xs text-muted-foreground">
						<span>Giáo viên:</span>
						{classPreview.teacher && (
							<span>{classPreview.teacher.fullName}</span>
						)}
					</div>
				</div>
			)}

			<div className="flex gap-2 w-full mt-1">
				<Button
					type="button"
					variant="outline"
					className="flex-1 hover:bg-gray-200 cursor-pointer"
					onClick={onBack}
					disabled={isJoining}
				>
					Quay lại
				</Button>

				<Button
					type="button"
					className="flex-1 hover:bg-primary/90 cursor-pointer"
					onClick={onConfirm}
					disabled={isLoading || isError || !classPreview || isJoining}
				>
					{isJoining ? "Đang tham gia..." : "Tham gia"}
				</Button>
			</div>
		</div>
	);
};

export default ClassPreviewSection;
