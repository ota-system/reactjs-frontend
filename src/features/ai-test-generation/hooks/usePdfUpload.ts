import { useState } from "react";
import { toast } from "@/lib/toast";

interface UsePdfUploadOptions {
	onFileChange: (file: File | null) => void;
	disabled?: boolean;
}

export const usePdfUpload = ({
	onFileChange,
	disabled = false,
}: UsePdfUploadOptions) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		onFileChange(selectedFile);
	};

	const removeFile = () => {
		onFileChange(null);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!disabled) {
			setIsDragging(true);
		}
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		if (disabled) {
			return;
		}

		const droppedFile = e.dataTransfer.files?.[0];
		if (!droppedFile) {
			return;
		}

		if (droppedFile.type !== "application/pdf") {
			toast.error("Vui lòng chỉ tải lên tệp PDF.");
			return;
		}

		onFileChange(droppedFile);
	};

	const handleClick = () => {
		if (!disabled) {
			document.getElementById("pdf-upload")?.click();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!disabled && (e.key === "Enter" || e.key === " ")) {
			document.getElementById("pdf-upload")?.click();
		}
	};

	const handlePreview = (file: File) => {
		const url = URL.createObjectURL(file);
		window.open(url, "_blank");
	};

	return {
		isDragging,
		handleFileChange,
		removeFile,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleClick,
		handleKeyDown,
		handlePreview,
	};
};
