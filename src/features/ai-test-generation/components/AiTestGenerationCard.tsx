import { FileText, Info, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import PdfUploadArea from "./PdfUploadArea";

interface AiTestGenerationCardProps {
	prompt: string;
	onPromptChange: (value: string) => void;
	onGenerate: () => void;
	isGenerating?: boolean;
	subject: string;
	onSubjectChange: (value: string) => void;
	haveGeneratedResult?: boolean;
	mode: "text" | "pdf";
	onModeChange: (mode: "text" | "pdf") => void;
	selectedFile: File | null;
	onFileChange: (file: File | null) => void;
}

export default function AiTestGenerationCard({
	prompt,
	onPromptChange,
	onGenerate,
	isGenerating = false,
	subject = "",
	onSubjectChange,
	haveGeneratedResult = false,
	mode,
	onModeChange,
	selectedFile,
	onFileChange,
}: AiTestGenerationCardProps) {
	const isSubmitDisabled =
		(mode === "text" ? !prompt.trim() : !selectedFile) || isGenerating;

	const getGenerateButtonLabel = () => {
		if (isGenerating) {
			return "Đang tạo bài thi...";
		}
		if (haveGeneratedResult) {
			return "Tạo lại bài thi bằng AI";
		}
		return "Tạo bài thi bằng AI";
	};

	return (
		<Card className="rounded-2xl border">
			<CardContent className="space-y-6 p-8">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div className="flex items-center gap-3 text-2xl font-semibold text-[var(--primary-color)]">
						<Sparkles className="size-5" />
						<h2>Tạo bài thi bằng AI</h2>
					</div>

					<div className="flex rounded-lg bg-secondary/50 p-1 border w-fit">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onModeChange("text")}
							disabled={isGenerating}
							className={cn(
								"h-9 rounded-md px-4 text-sm font-medium transition-all cursor-pointer flex items-center gap-2",
								mode === "text" && "bg-white shadow-sm text-black",
								mode !== "text" && "text-muted-foreground",
							)}
						>
							<FileText className="size-4" />
							<span>Nhập văn bản</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onModeChange("pdf")}
							disabled={isGenerating}
							className={cn(
								"h-9 rounded-md px-4 text-sm font-medium transition-all cursor-pointer flex items-center gap-2",
								mode === "pdf" && "bg-white shadow-sm text-black",
								mode !== "pdf" && "text-muted-foreground",
							)}
						>
							<FileText className="size-4" />
							<span>Tải lên PDF</span>
						</Button>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center gap-2 text-lg font-medium text-[var(--primary-color)]">
						<Lightbulb className="size-6" />
						<p>
							{mode === "pdf"
								? "Tải lên tệp PDF và thêm yêu cầu (tùy chọn)"
								: "Mô tả bài thi của bạn"}
						</p>
					</div>

					{mode === "pdf" && (
						<PdfUploadArea
							file={selectedFile}
							onFileChange={onFileChange}
							disabled={isGenerating}
						/>
					)}

					<Textarea
						value={prompt}
						onChange={(event) => onPromptChange(event.target.value)}
						placeholder={
							"VD: Tạo bài thi về Present Perfect Tense với các dạng bài nhận biết thì, chia động từ, và hoàn thành câu. Độ khó trung bình, 15 câu hỏi gồm 5 câu trắc nghiệm và 10 câu điền từ."
						}
						rows={3}
						className="text-xl"
						readOnly={isGenerating}
					/>

					<div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-600 border border-blue-100">
						<Info className="mt-0.5 size-4 shrink-0" />
						<p>
							{mode === "pdf"
								? "AI sẽ dựa vào nội dung PDF và mô tả của bạn để tạo câu hỏi"
								: "Càng mô tả chi tiết (chủ đề, độ khó, dạng bài), AI sẽ tạo câu hỏi phù hợp hơn"}
						</p>
					</div>
					{haveGeneratedResult && (
						<div className="space-y-2">
							<Label className="text-base font-semibold">Chủ đề</Label>
							<Input
								value={subject}
								onChange={(event) => onSubjectChange(event.target.value)}
								placeholder="VD: Grammar"
							/>
						</div>
					)}
				</div>

				<Button
					type="button"
					onClick={onGenerate}
					disabled={isSubmitDisabled}
					className="h-12 w-full text-lg cursor-pointer"
				>
					<Sparkles className="size-4" />
					{getGenerateButtonLabel()}
				</Button>
			</CardContent>
		</Card>
	);
}
