import type { EnglishTest } from "../types/EnglishTest";
import type { TestInformationValues } from "../types/TestInformation";
import type { GeneratedQuestionUI } from "./mapGeneratedQuestionToUI";

interface BuildEnglishTestPayloadParams {
	classId?: string;
	testInformation: TestInformationValues;
	questions: GeneratedQuestionUI[];
}

type BuildEnglishTestPayloadResult =
	| { payload: EnglishTest }
	| { error: string };

const buildEnglishTestPayload = ({
	classId,
	testInformation,
	questions,
}: BuildEnglishTestPayloadParams): BuildEnglishTestPayloadResult => {
	const title = testInformation.title.trim();

	if (!title) {
		return { error: "Vui lòng nhập tên bài thi." };
	}

	if (questions.length === 0) {
		return { error: "Bài thi chưa có câu hỏi để lưu." };
	}

	const duration = Number(testInformation.durationMinutes);
	if (!Number.isFinite(duration) || duration <= 0) {
		return { error: "Thời gian làm bài phải lớn hơn 0 phút." };
	}

	let startedTime = "";
	if (testInformation.publishNow) {
		startedTime = new Date().toISOString();
	} else {
		const hasStartDate = testInformation.startDate.trim().length > 0;
		const hasStartTime = testInformation.startTime.trim().length > 0;

		if (!hasStartDate || !hasStartTime) {
			return {
				error:
					"Vui lòng nhập ngày và giờ bắt đầu bài thi hoặc chọn xuất bản ngay.",
			};
		}

		const startTimestamp = Date.parse(
			`${testInformation.startDate}T${testInformation.startTime}:00`,
		);

		if (Number.isNaN(startTimestamp)) {
			return { error: "Ngày hoặc giờ bắt đầu không hợp lệ." };
		}

		if (startTimestamp <= Date.now()) {
			return { error: "Ngày và giờ bắt đầu phải lớn hơn thời điểm hiện tại." };
		}

		startedTime = new Date(startTimestamp).toISOString();
	}

	if (!classId) {
		return {
			error:
				"Không tìm thấy lớp học. Vui lòng mở trang tạo đề từ màn hình chi tiết lớp.",
		};
	}

	const mappedQuestions: EnglishTest["questions"] = questions.map(
		(question) => {
			const normalizedOptions = question.options.map((option) =>
				option.value.trim(),
			);
			const answer =
				question.questionType === "Trắc nghiệm"
					? (normalizedOptions[question.correctOptionIndex] ?? "")
					: question.correctAnswer.trim();

			return {
				question: question.question.trim(),
				difficulty: question.difficulty,
				questionType: question.questionType,
				options:
					question.questionType === "Trắc nghiệm"
						? normalizedOptions
						: undefined,
				correctOptionIndex:
					question.questionType === "Trắc nghiệm"
						? question.correctOptionIndex
						: undefined,
				answer,
				explanation: question.explanation?.trim() ?? "",
			};
		},
	);

	const hasInvalidQuestion = mappedQuestions.some(
		(question) =>
			!question.question ||
			!question.answer ||
			(question.questionType === "Trắc nghiệm" &&
				(!question.options || question.options.filter(Boolean).length < 2)),
	);

	if (hasInvalidQuestion) {
		return {
			error:
				"Vui lòng kiểm tra lại nội dung câu hỏi, đáp án và đáp án đúng trước khi lưu.",
		};
	}

	return {
		payload: {
			testName: title,
			classId,
			startedTime,
			duration,
			antiCheating: testInformation.antiCheatEnabled,
			questions: mappedQuestions,
		},
	};
};

export default buildEnglishTestPayload;
