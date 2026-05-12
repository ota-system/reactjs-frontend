import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import ConfirmedDialog from "@/shared/components/ConfirmedDialog";
import AiTestGenerationCard from "../components/AiTestGenerationCard";
import GeneratedQuestionsSection from "../components/GeneratedQuestionsSection";
import TestCreationHeader from "../components/TestCreationHeader";
import TestInformationPanel from "../components/TestInformationPanel";
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
	const [prompt, setPrompt] = useState("");
	const [subject, setSubject] = useState("");
	const [questions, setQuestions] = useState<GeneratedQuestionUI[]>([]);
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
	const previousQuestionsLengthRef = useRef(0);
	const { mutateAsync: generatePrompt, isPending } = useGeneratePrompt();
	const { mutateAsync: saveEnglishTest, isPending: isSavingTest } =
		useEnglishTest();

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
	}, [questions]);

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
			subject.trim() !== lastGeneratedInput.subject
		);
	};

	const runGenerate = async (saveCurrentAsDraft: boolean) => {
		const previousQuestions = cloneQuestions(questions);
		const previousSubject = subject;
		const previousPrompt = prompt;
		const previousTestInformation = { ...testInformation };

		if (saveCurrentAsDraft && questions.length > 0) {
			setDraftSnapshot({
				prompt: previousPrompt,
				subject: previousSubject,
				questions: previousQuestions,
				testInformation: previousTestInformation,
			});
		} else if (!saveCurrentAsDraft) {
			setDraftSnapshot(null);
		}

		setIsRegenerateDialogOpen(false);
		setQuestions([]);

		try {
			const generationPrompt = buildGeneratePrompt(prompt, subject);

			const allQuestions = await generatePrompt({
				prompt: generationPrompt,
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

			setLastGeneratedInput({
				prompt: prompt.trim(),
				subject: effectiveSubject,
			});

			if (allQuestions.length > 0 && !subject.trim()) {
				setSubject(effectiveSubject);
			}
			handleTestInformationChange("title", effectiveSubject);

			toast.success(`Đã tạo ${allQuestions.length} câu hỏi từ AI.`);
		} catch (error) {
			setQuestions(previousQuestions);
			setSubject(previousSubject);
			setPrompt(previousPrompt);
			setTestInformation(previousTestInformation);

			const message =
				error instanceof Error
					? error.message
					: "Tạo bài thi thất bại. Vui lòng thử lại.";
			toast.error(message);
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
				questionType: "Trắc nghiệm",
				subject: subject.trim(),
				difficulty: "Trung bình",
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
		setLastGeneratedInput({
			prompt: draftSnapshot.prompt.trim(),
			subject: draftSnapshot.subject.trim(),
		});
		setDraftSnapshot(null);

		toast.success("Đã khôi phục bản nháp gần nhất.");
	};

	return (
		<div className="mx-auto w-full max-w-7xl space-y-8 p-6 md:p-8">
			<TestCreationHeader
				title="Tạo bài thi mới"
				subtitle="English Advanced Level"
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
		</div>
	);
};

export default EnglishTestGeneration;
