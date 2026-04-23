import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import AiTestGenerationCard from "../components/AiTestGenerationCard";
import GeneratedQuestionsSection from "../components/GeneratedQuestionsSection";
import TestCreationHeader from "../components/TestCreationHeader";
import TestInformationPanel, {
	type TestInformationValues,
} from "../components/TestInformationPanel";
import useGeneratePrompt from "../hooks/useGeneratePrompt";
import mapGeneratedQuestionToUI, {
	type GeneratedQuestionUI,
} from "../utils/mapGeneratedQuestionToUI";

const EnglishTestGeneration = () => {
	const navigate = useNavigate();
	const [prompt, setPrompt] = useState("");
	const [questions, setQuestions] = useState<GeneratedQuestionUI[]>([]);
	const [testInformation, setTestInformation] = useState<TestInformationValues>(
		{
			title: "",
			startDate: "",
			startTime: "",
			durationMinutes: "45",
			totalScore: "10",
			antiCheatEnabled: true,
			publishNow: false,
		},
	);
	const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const previousQuestionsLengthRef = useRef(0);
	const { mutateAsync: generatePrompt, isPending } = useGeneratePrompt();

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
	}, [questions.length]);

	const updateQuestion = (
		id: string,
		updater: (current: GeneratedQuestionUI) => GeneratedQuestionUI,
	) => {
		setQuestions((prev) =>
			prev.map((item) => (item.id === id ? updater(item) : item)),
		);
	};

	const handleGenerateTest = async () => {
		try {
			setQuestions([]);

			const allQuestions = await generatePrompt({
				prompt,
				onQuestion: (raw) => {
					setQuestions((prev) => [...prev, mapGeneratedQuestionToUI(raw)]);
				},
			});

			toast.success(`Đã tạo ${allQuestions.length} câu hỏi từ AI.`);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Tạo bài thi thất bại. Vui lòng thử lại.";
			toast.error(message);
		}
	};

	const handleTestInformationChange = (
		field: keyof TestInformationValues,
		value: string | boolean,
	) => {
		setTestInformation((prev) => ({ ...prev, [field]: value }));
	};

	const handleCancelTestInformation = () => {
		setTestInformation({
			title: "",
			startDate: "",
			startTime: "",
			durationMinutes: "45",
			totalScore: "10",
			antiCheatEnabled: true,
			publishNow: false,
		});
	};

	const handleSaveTest = () => {
		toast.info("Chức năng lưu bài thi sẽ được nối API sau.");
	};

	const handleQuestionRef = (id: string, element: HTMLDivElement | null) => {
		questionRefs.current[id] = element;
	};

	const handleSubjectChange = (value: string) => {
		setQuestions((prev) =>
			prev.map((question) => ({
				...question,
				subject: value,
			})),
		);
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
				subject={questions[0]?.subject || ""}
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
				onQuestionRef={handleQuestionRef}
			/>

			{questions.length > 0 && !isPending && (
				<TestInformationPanel
					values={testInformation}
					onFieldChange={handleTestInformationChange}
					onCancel={handleCancelTestInformation}
					onSave={handleSaveTest}
				/>
			)}
		</div>
	);
};

export default EnglishTestGeneration;
