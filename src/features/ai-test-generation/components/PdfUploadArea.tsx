import { FileIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePdfUpload } from "../hooks/usePdfUpload";

interface PdfUploadAreaProps {
	file: File | null;
	onFileChange: (file: File | null) => void;
	disabled?: boolean;
}

export default function PdfUploadArea({
	file,
	onFileChange,
	disabled = false,
}: PdfUploadAreaProps) {
	const {
		isDragging,
		handleFileChange,
		removeFile,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleClick,
		handleKeyDown,
		handlePreview,
	} = usePdfUpload({ onFileChange, disabled });

	if (!file) {
		return (
			<div className="space-y-4">
				<button
					type="button"
					className={`w-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
						disabled
							? "bg-muted cursor-not-allowed opacity-50"
							: isDragging
								? "border-primary bg-primary/10"
								: "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
					}`}
					onClick={handleClick}
					onKeyDown={handleKeyDown}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					disabled={disabled}
				>
					<input
						id="pdf-upload"
						type="file"
						accept=".pdf"
						className="hidden"
						onChange={handleFileChange}
						disabled={disabled}
					/>
					<FileIcon className="mb-2 size-8 text-muted-foreground" />
					<p className="text-base font-medium">
						Nhấp để tải lên hoặc kéo thả tệp PDF
					</p>
					<p className="mt-1 text-sm text-muted-foreground">Tối đa 20MB</p>
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between rounded-xl border p-4 bg-primary/5 border-primary/20">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-primary/10 p-2">
						<FileIcon className="size-5 text-primary" />
					</div>
					<div className="min-w-0">
						<Button
							type="button"
							variant="ghost"
							className="truncate text-sm font-medium hover:underline cursor-pointer decoration-primary/50 underline-offset-4 text-left h-auto px-0 py-0"
							onClick={() => handlePreview(file)}
							title="Nhấp để xem trước tệp"
						>
							{file.name}
						</Button>
						<p className="text-xs text-muted-foreground">
							{(file.size / (1024 * 1024)).toFixed(2)} MB
						</p>
					</div>
				</div>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={removeFile}
					disabled={disabled}
					className="size-8 rounded-full cursor-pointer"
				>
					<X className="size-4" />
					<span className="sr-only">Xóa tệp</span>
				</Button>
			</div>
		</div>
	);
}
