import { tokenService } from "@/lib/tokens";

export interface GeneratedQuestion {
	id: number;
	question: string;
	topic: string;
	difficulty: string;
	options?: Array<string>;
	questionType: string;
	correctOptionIndex?: number;
	answer: string;
	explanation: string;
}

export interface GenerateTestOptions {
	onQuestion?: (question: GeneratedQuestion) => void;
	signal?: AbortSignal;
}

const createAuthHeaders = () => {
	const headers = new Headers();
	const token = tokenService.getAccessToken();

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	return headers;
};

const createStreamEndpoint = (prompt: string) => {
	const encodedPrompt = encodeURIComponent(prompt);
	const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
		/\/$/,
		"",
	);

	return `${apiBaseUrl}/api/v1/test-generation/generate-stream?prompt=${encodedPrompt}`;
};

const cleanEventData = (line: string) => {
	const trimmed = line.trim();

	if (!trimmed) {
		return null;
	}

	if (trimmed.startsWith("event:") || trimmed.startsWith("id:")) {
		return null;
	}

	if (trimmed.startsWith("data:")) {
		return trimmed.slice(5).trim();
	}

	return trimmed;
};

const parseQuestionPayload = (payload: string) => {
	try {
		return JSON.parse(payload) as GeneratedQuestion;
	} catch {
		console.warn("Không thể phân tích câu hỏi từ AI:", payload);
		return null;
	}
};

const readQuestionsFromStream = async (
	response: Response,
	onQuestion?: (question: GeneratedQuestion) => void,
) => {
	if (!response.body) {
		throw new Error("Không nhận được dữ liệu stream từ máy chủ");
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder("utf-8");
	const questions: GeneratedQuestion[] = [];
	let buffer = "";
	let streamClosed = false;

	while (!streamClosed) {
		const { value, done } = await reader.read();

		if (done) {
			break;
		}

		buffer += decoder.decode(value, { stream: true });

		const lines = buffer.split(/\r?\n/);
		buffer = lines.pop() ?? "";

		for (const line of lines) {
			const payload = cleanEventData(line);
			if (!payload) {
				continue;
			}

			if (payload === "[DONE]") {
				streamClosed = true;
				break;
			}

			const question = parseQuestionPayload(payload);
			if (!question) {
				continue;
			}

			questions.push(question);
			onQuestion?.(question);
		}
	}

	const trailingPayload = cleanEventData(buffer);
	if (trailingPayload && trailingPayload !== "[DONE]") {
		const question = parseQuestionPayload(trailingPayload);
		if (question) {
			questions.push(question);
			onQuestion?.(question);
		}
	}

	return questions;
};

export const generateTest = async (
	prompt: string,
	options: GenerateTestOptions = {},
) => {
	const response = await fetch(createStreamEndpoint(prompt), {
		method: "GET",
		headers: createAuthHeaders(),
		signal: options.signal,
	});

	if (response.status === 404) {
		throw new Error("Không tìm thấy đề thi");
	}

	if (!response.ok) {
		throw new Error("Không thể tạo bài thi từ AI");
	}

	return readQuestionsFromStream(response, options.onQuestion);
};
