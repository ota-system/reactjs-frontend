import { refreshAccessToken } from "@/core/api/httpClient.api";
import { toast } from "@/lib/toast";
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

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
	/\/$/,
	"",
);

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

	return `${API_BASE_URL}/api/v1/english-tests/generate-stream?prompt=${encodedPrompt}`;
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
		return JSON.parse(payload);
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

			const data = parseQuestionPayload(payload);
			if (!data) {
				continue;
			}

			if (data.code === "GREETING") {
				toast.info(
					data.message ||
						"Chào bạn! Tôi là trợ lý OTA của bạn, sẵn sàng giúp bạn tạo đề thi tiếng Anh.",
				);
				break;
			}

			if (data.code === "INVALID_PROMPT") {
				toast.error(
					data.message ||
						"Prompt không hợp lệ. Vui lòng thử lại với prompt khác.",
				);
				break;
			}

			questions.push(data);
			onQuestion?.(data);
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
): Promise<GeneratedQuestion[]> => {
	const response = await fetch(createStreamEndpoint(prompt), {
		method: "GET",
		headers: createAuthHeaders(),
		signal: options.signal,
	});

	if (response.status === 401) {
		const refreshed = await refreshAccessToken();
		if (refreshed) {
			return generateTest(prompt, options);
		} else {
			throw new Error("Hết hạn đăng nhập. Vui lòng đăng nhập lại.", {
				cause: "UNAUTHORIZED",
			});
		}
	}

	if (response.status === 404) {
		throw new Error("Không tìm thấy đề thi");
	}

	if (!response.ok) {
		throw new Error("Không thể tạo bài thi từ AI");
	}

	return readQuestionsFromStream(response, options.onQuestion);
};

export const generateTestFromPdf = async (
	file: File,
	prompt: string,
	options: GenerateTestOptions = {},
) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("prompt", prompt);

	const url = `${API_BASE_URL}/api/v1/english-tests/generate-stream-pdf`;

	const response = await fetch(url, {
		method: "POST",
		headers: createAuthHeaders(),
		body: formData,
		signal: options.signal,
	});

	if (!response.ok) {
		const errorData = (await response.json().catch(() => ({}))) as {
			message?: string;
		};
		throw new Error(errorData.message || "Không thể tạo bài thi từ PDF");
	}

	return readQuestionsFromStream(response, options.onQuestion);
};
