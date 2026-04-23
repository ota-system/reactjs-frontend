import { CircleAlert, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AiTestGenerationCardProps {
	prompt: string;
	onPromptChange: (value: string) => void;
	onGenerate: () => void;
	isGenerating?: boolean;
	subject: string;
	onSubjectChange: (value: string) => void;
	haveGeneratedResult?: boolean;
}

export default function AiTestGenerationCard({
	prompt,
	onPromptChange,
	onGenerate,
	isGenerating = false,
	subject = "",
	onSubjectChange,
	haveGeneratedResult = false,
}: AiTestGenerationCardProps) {
	const isSubmitDisabled = !prompt.trim() || isGenerating;
	const generateButtonLabel = isGenerating
		? "Đang tạo bài thi..."
		: haveGeneratedResult
			? "Tạo lại bài thi bằng AI"
			: "Tạo bài thi bằng AI";

	return (
		<Card className="rounded-2xl border">
			<CardContent className="space-y-6 p-8">
				<div className="flex items-center gap-3 text-2xl font-semibold text-[var(--primary-color)]">
					<Sparkles className="size-5" />
					<h2>Tạo bài thi bằng AI</h2>
				</div>

				<div className="space-y-4">
					<div className="flex items-center gap-2 text-lg font-medium text-[var(--primary-color)]">
						<Lightbulb className="size-6" />
						<p>Mô tả bài thi của bạn</p>
					</div>
					<Textarea
						value={prompt}
						onChange={(event) => onPromptChange(event.target.value)}
						placeholder="VD: Tạo bài thi về Present Perfect Tense với các dạng bài nhận biết thì, chia động từ, và hoàn thành câu. Độ khó trung bình, 15 câu hỏi gồm 5 câu trắc nghiệm và 10 câu điền từ."
						rows={3}
						className="text-xl"
					/>
					<div className="flex items-start gap-2 text-sm text-red-500">
						<CircleAlert className="mt-1 size-3" />
						<p>
							Càng mô tả chi tiết (chủ đề, độ khó, dạng bài), AI sẽ tạo câu hỏi
							phù hợp hơn
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
					{generateButtonLabel}
				</Button>
			</CardContent>
		</Card>
	);
}
