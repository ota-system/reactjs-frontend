import { Button } from "@/components/ui/button";

interface TestErrorStateProps {
	errorMessage: string;
	testName?: string;
	totalQuestions?: number;
	answeredCount?: number;
	onBack: () => void;
}

export default function TestErrorState({
	errorMessage,
	testName,
	totalQuestions,
	answeredCount,
	onBack,
}: TestErrorStateProps) {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			{testName && (
				<div className="rounded-2xl border bg-background p-6 shadow-sm space-y-1 text-center">
					<h1 className="text-xl font-bold text-[var(--primary-color)]">
						{testName}
					</h1>
					<p className="text-sm text-muted-foreground">
						{totalQuestions} câu hỏi • Đã trả lời: {answeredCount}/
						{totalQuestions}
					</p>
				</div>
			)}
			<p className="text-lg font-medium text-destructive">{errorMessage}</p>
			<Button variant="outline" className="cursor-pointer" onClick={onBack}>
				Về trang chủ
			</Button>
		</div>
	);
}
