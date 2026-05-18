import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import ConfirmedDialog from "@/shared/components/ConfirmedDialog";
import TestInformationPanel from "@/shared/components/TestInformationPanel";
import { LevelEnum, QuestionTypeEnum } from "@/shared/constants/questionOption";
import AiTestGenerationCard from "../components/AiTestGenerationCard";
import GeneratedQuestionsSection from "../components/GeneratedQuestionsSection";
import TestCreationHeader from "../components/TestCreationHeader";
import useEnglishTest from "../hooks/useEnglishTest";
import useGeneratePrompt from "../hooks/useGeneratePrompt";
import useEnglishTestInformationStore from "../stores/englishTestInformation.store";
import type {
	DraftSnapshot,
	GeneratedInputSnapshot,
} from "../types/EnglishTestGenerationState";
import buildEnglishTestPayload from "../utils/buildEnglishTestPayload";
import buildGeneratePrompt from "../utils/buildGeneratePrompt";
import cloneQuestions from "../utils/cloneQuestions";
import focusInvalidQuestionField from "../utils/focusInvalidQuestionField";
import mapGeneratedQuestionToUI, {
	type GeneratedQuestionUI,
} from "../utils/mapGeneratedQuestionToUI";

const EnglishTestGeneration = () => {
	const { classId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [prompt, setPrompt] = useState("");
	const [subject, setSubject] = useState("");
	const [mode, setMode] = useState<"text" | "pdf">("text");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [questions, setQuestions] = useState<GeneratedQuestionUI[]>([]);
	const [hasGenerated, setHasGenerated] = useState(false);
	const testInformation = useEnglishTestInformationStore(
		(state) => state.testInformation,
	);
	const setTestInformation = useEnglishTestInformationStore(
		(state) => state.setTestInformation,
	);
	const setTestInformationField = useEnglishTestInformationStore(
		(state) => state.setTestInformationField,
	);
	const resetTestInformation = useEnglishTestInformationStore(
		(state) => state.resetTestInformation,
	);
	const [draftSnapshot, setDraftSnapshot] = useState<DraftSnapshot | null>(
		null,
	);
	const [lastGeneratedInput, setLastGeneratedInput] =
		useState<GeneratedInputSnapshot | null>(null);
	const [isRegenerateDialogOpen, setIsRegenerateDialogOpen] = useState(false);
	const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const abortControllerRef = useRef<AbortController | null>(null);
	const previousQuestionsLengthRef = useRef(0);
	const { mutateAsync: generatePrompt, isPending } = useGeneratePrompt();
	const { mutateAsync: saveEnglishTest, isPending: isSavingTest } =
		useEnglishTest();

	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	useEffect(() => {
		const hasNewQuestion =
			questions.length > previousQuestionsLengthRef.current;
		previousQuestionsLengthRef.current = questions.length;

		if (!hasNewQuestion || questions.length === 0) {
			return;
		}

		const latestQuestion = questions[questions.length - 1];
		const latestQuestionElement = questionRefs.current[latestQuestion.id];

		latestQuestionElement?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});
	}, [questions.length, questions]);

	const updateQuestion = (
		id: string,
		updater: (current: GeneratedQuestionUI) => GeneratedQuestionUI,
	) => {
		setQuestions((prev) =>
			prev.map((item) => (item.id === id ? updater(item) : item)),
		);
	};

	const hasInputChangedSinceLastGeneration = () => {
		if (!lastGeneratedInput) {
			return true;
		}

		return (
			prompt.trim() !== lastGeneratedInput.prompt ||
			subject.trim() !== lastGeneratedInput.subject ||
			(mode === "pdf" && selectedFile !== lastGeneratedInput.file)
		);
	};

	const runGenerate = async (saveCurrentAsDraft: boolean) => {
		const previousQuestions = cloneQuestions(questions);
		const previousSubject = subject;
		const previousPrompt = prompt;
		const previousTestInformation = { ...testInformation };
		const previousMode = mode;
		const previousFile = selectedFile;
		const nextDraftSnapshot =
			saveCurrentAsDraft && questions.length > 0
				? {
						prompt: previousPrompt,
						subject: previousSubject,
						questions: previousQuestions,
						testInformation: previousTestInformation,
						mode: previousMode,
						file: previousFile,
					}
				: null;

		if (nextDraftSnapshot) {
			setDraftSnapshot(nextDraftSnapshot);
		} else if (!saveCurrentAsDraft) {
			setDraftSnapshot(null);
		}

		setIsRegenerateDialogOpen(false);
		setQuestions([]);

		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		abortControllerRef.current = new AbortController();

		try {
			const generationPrompt = buildGeneratePrompt(prompt, subject);

			const allQuestions = await generatePrompt({
				prompt: generationPrompt,
				file: mode === "pdf" ? selectedFile || undefined : undefined,
				signal: abortControllerRef.current.signal,
				onQuestion: (raw) => {
					const mappedQuestion = mapGeneratedQuestionToUI(raw);
					const nextQuestion = subject.trim()
						? { ...mappedQuestion, subject: subject.trim() }
						: mappedQuestion;

					setQuestions((prev) => [...prev, nextQuestion]);
				},
			});

			const generatedSubject = (allQuestions[0]?.topic ?? "").trim();
			const effectiveSubject = subject.trim() || generatedSubject;

			if (allQuestions.length > 0 && !subject.trim()) {
				setSubject(effectiveSubject);
			}
			handleTestInformationChange("title", effectiveSubject);

			if (allQuestions.length === 0 && nextDraftSnapshot) {
				setSubject(nextDraftSnapshot.subject);
				setQuestions(cloneQuestions(nextDraftSnapshot.questions));
				setTestInformation({ ...nextDraftSnapshot.testInformation });
				setDraftSnapshot(null);
				return;
			}

			if (allQuestions.length === 0) {
				setHasGenerated(false);
				setLastGeneratedInput(null);
				return;
			}

			if (allQuestions.length > 0) {
				setLastGeneratedInput({
					prompt: prompt.trim(),
					subject: effectiveSubject,
					mode: mode,
					file: mode === "pdf" ? selectedFile || undefined : undefined,
				});
				setHasGenerated(true);
				toast.success(`Đã tạo ${allQuestions.length} câu hỏi từ AI.`);
			}
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				return;
			}
			setQuestions(previousQuestions);
			setSubject(previousSubject);
			setPrompt(previousPrompt);
			setTestInformation(previousTestInformation);
			if (error instanceof Error && (error as any).cause === "UNAUTHORIZED") {
				navigate("/sign-in", { replace: true });
				toast.info(error.message);
				return;
			}

			const message =
				error instanceof Error
					? error.message
					: "Tạo bài thi thất bại. Vui lòng thử lại.";
			toast.error(message);
		} finally {
			abortControllerRef.current = null;
		}
	};

	const handleGenerateTest = async () => {
		if (!hasInputChangedSinceLastGeneration()) {
			toast.info("Hãy cập nhật prompt hoặc chủ đề trước khi tạo lại bài thi.");
			return;
		}

		if (!lastGeneratedInput) {
			await runGenerate(false);
			return;
		}

		console.log(
			"Prompt hoặc chủ đề đã thay đổi kể từ lần tạo bài thi cuối cùng. Hiển thị hộp thoại xác nhận tái tạo.",
		);
		setIsRegenerateDialogOpen(true);
	};

	const handleTestInformationChange = (
		field: Parameters<typeof setTestInformationField>[0],
		value: Parameters<typeof setTestInformationField>[1],
	) => {
		setTestInformationField(field, value);
	};

	const handleCancelTestInformation = () => {
		resetTestInformation();
	};

	const handleSaveTest = () => {
		const result = buildEnglishTestPayload({
			classId,
			testInformation,
			questions,
		});

		if ("error" in result) {
			toast.error(result.error);

			if (result.errorFocus) {
				focusInvalidQuestionField({
					issue: result.errorFocus,
					questionRefs,
				});
			}

			return;
		}

		void (async () => {
			try {
				const response = await saveEnglishTest(result.payload);
				toast.success(response.message || "Lưu bài thi thành công.");

				setPrompt("");
				setSubject("");
				setQuestions([]);
				resetTestInformation();
				setDraftSnapshot(null);
				setLastGeneratedInput(null);
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Lưu bài thi thất bại. Vui lòng thử lại.";
				toast.error(message);
			}
		})();
	};

	const handleQuestionRef = (id: string, element: HTMLDivElement | null) => {
		questionRefs.current[id] = element;
	};

	const handleSubjectChange = (value: string) => {
		setSubject(value);
		setQuestions((prev) =>
			prev.map((question) => ({
				...question,
				subject: value,
			})),
		);
	};

	const handleAddManualQuestion = () => {
		const now = Date.now();
		setQuestions((prev) => [
			...prev,
			{
				id: `manual-${now}-${Math.random()}`,
				question: "",
				questionType: QuestionTypeEnum.MULTIPLE_CHOICE,
				subject: subject.trim(),
				difficulty: LevelEnum.MEDIUM,
				options: [
					{ id: "0", value: "" },
					{ id: "1", value: "" },
					{ id: "2", value: "" },
					{ id: "3", value: "" },
				],
				correctOptionIndex: 0,
				correctAnswer: "",
			},
		]);
	};

	const handleRollbackToDraft = () => {
		if (!draftSnapshot) {
			return;
		}

		setPrompt(draftSnapshot.prompt);
		setSubject(draftSnapshot.subject);
		setQuestions(cloneQuestions(draftSnapshot.questions));
		setTestInformation({ ...draftSnapshot.testInformation });
		setMode(draftSnapshot.mode);
		setSelectedFile(draftSnapshot.file || null);
		setLastGeneratedInput({
			prompt: draftSnapshot.prompt.trim(),
			subject: draftSnapshot.subject.trim(),
			file: draftSnapshot.file,
			mode: draftSnapshot.mode,
		});
		setDraftSnapshot(null);

		toast.success("Đã khôi phục bản nháp gần nhất.");
	};

	const handleFileChange = (file: File | null) => {
		if (file) {
			if (file.type !== "application/pdf") {
				toast.error("Vui lòng chỉ tải lên tệp PDF.");
				return;
			}
			if (file.size > 20 * 1024 * 1024) {
				toast.error("Tệp PDF không được vượt quá 20MB.");
				return;
			}
		}
		setSelectedFile(file);
	};

	return (
		<div className="mx-auto w-full max-w-7xl space-y-8 p-6 md:p-8">
			<TestCreationHeader
				title="Tạo bài thi mới"
				subtitle={
					location.state?.className
						? `Lớp: ${location.state.className}`
						: "Lớp học"
				}
				onBack={() => navigate(-1)}
			/>

			<AiTestGenerationCard
				prompt={prompt}
				onPromptChange={setPrompt}
				subject={subject}
				onSubjectChange={handleSubjectChange}
				onGenerate={handleGenerateTest}
				isGenerating={isPending}
				haveGeneratedResult={questions.length > 0}
				mode={mode}
				onModeChange={setMode}
				selectedFile={selectedFile}
				onFileChange={handleFileChange}
			/>

			<GeneratedQuestionsSection
				questions={questions}
				onUpdateQuestion={updateQuestion}
				onDeleteQuestion={(id) =>
					setQuestions((prev) => prev.filter((item) => item.id !== id))
				}
				onAddManualQuestion={handleAddManualQuestion}
				onQuestionRef={handleQuestionRef}
				draftSnapshot={draftSnapshot}
				isPending={isPending}
				handleRollbackToDraft={handleRollbackToDraft}
			/>

			{isPending && (
				<div className="space-y-4">
					<div className="space-y-4">
						<Skeleton className="h-36 w-full rounded-2xl" />
						<Skeleton className="h-36 w-full rounded-2xl" />
						<Skeleton className="h-36 w-full rounded-2xl" />
					</div>
				</div>
			)}

			{questions.length > 0 && !isPending && (
				<TestInformationPanel
					values={testInformation}
					onFieldChange={handleTestInformationChange}
					onCancel={handleCancelTestInformation}
					isSaving={isSavingTest}
					onSave={handleSaveTest}
				/>
			)}
			{(questions.length > 0 || hasGenerated) && (
				<Dialog
					open={isRegenerateDialogOpen}
					onOpenChange={setIsRegenerateDialogOpen}
				>
					<ConfirmedDialog
						title="Tạo lại bài thi"
						description="Bạn có muốn lưu tạm bộ câu hỏi hiện tại làm bản nháp trước khi tạo bộ câu hỏi mới không?"
						action={() => void runGenerate(true)}
						actionLabel="Lưu nháp và tạo lại"
						actionVariant="default"
						secondaryAction={{
							label: "Không lưu, tạo lại",
							action: () => void runGenerate(false),
						}}
					/>
				</Dialog>
			)}
		</div>
	);
};

export default EnglishTestGeneration;
