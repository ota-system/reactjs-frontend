import type { TestInformationValues } from "@/shared/interfaces/TestInformation";
import {
	isMultipleChoiceUI,
	normalizeDifficultyToApi,
	normalizeQuestionTypeToApi,
} from "@/shared/utils/questionMapping";
import type { EnglishTest } from "../types/EnglishTest";
import findFirstInvalidQuestionIssue, {
	type InvalidQuestionIssue,
} from "./findFirstInvalidQuestionIssue";
import type { GeneratedQuestionUI } from "./mapGeneratedQuestionToUI";

interface BuildEnglishTestPayloadParams {
	classId?: string;
	testInformation: TestInformationValues;
	questions: GeneratedQuestionUI[];
}

type BuildEnglishTestPayloadResult =
	| { payload: EnglishTest }
	| { error: string; errorFocus?: InvalidQuestionIssue };

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

		const startAt = new Date(startTimestamp);
		startAt.setSeconds(0, 0);

		const now = new Date();
		now.setSeconds(0, 0);

		if (startAt.getTime() <= now.getTime()) {
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

	const firstInvalidQuestionIssue = findFirstInvalidQuestionIssue(questions);

	if (firstInvalidQuestionIssue) {
		return {
			error:
				"Vui lòng kiểm tra lại nội dung câu hỏi, đáp án và đáp án đúng trước khi lưu.",
			errorFocus: firstInvalidQuestionIssue,
		};
	}

	const mappedQuestions: EnglishTest["questions"] = questions.map(
		(question) => {
			const trimmedOptions = question.options.map((option) =>
				option.value.trim(),
			);

			if (isMultipleChoiceUI(question.questionType)) {
				const answer = trimmedOptions[question.correctOptionIndex] ?? "";

				const normalizedOptions: string[] = [];
				let remappedCorrectOptionIndex = 0;

				for (let i = 0; i < trimmedOptions.length; i++) {
					if (trimmedOptions[i] !== "") {
						if (i === question.correctOptionIndex) {
							remappedCorrectOptionIndex = normalizedOptions.length;
						}
						normalizedOptions.push(trimmedOptions[i]);
					}
				}

				return {
					question: question.question.trim(),
					difficulty: normalizeDifficultyToApi(question.difficulty),
					questionType: normalizeQuestionTypeToApi(question.questionType),
					options: normalizedOptions,
					correctOptionIndex: remappedCorrectOptionIndex,
					answer,
					explanation: question.explanation?.trim() ?? "",
				};
			}

			const answer = question.correctAnswer.trim();

			return {
				question: question.question.trim(),
				difficulty: normalizeDifficultyToApi(question.difficulty),
				questionType: normalizeQuestionTypeToApi(question.questionType),
				options: undefined,
				correctOptionIndex: undefined,
				answer,
				explanation: question.explanation?.trim() ?? "",
			};
		},
	);

	return {
		payload: {
			testName: title,
			topicName: questions[0].subject,
			classId,
			startedTime,
			duration,
			antiCheating: testInformation.antiCheatEnabled,
			questions: mappedQuestions,
		},
	};
};

export default buildEnglishTestPayload;
