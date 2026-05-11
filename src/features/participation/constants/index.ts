export const threshold = 10;

export const VISIBILITY_DEDUP_WINDOW_MS = 5000;

export const AUTO_SUBMIT_COUNTDOWN_MS = 5000;

export const thresholdMessages: Record<string, string> = {
	10: "Bạn đã có nhiều hành vi gian lận đáng ngờ trong quá trình làm bài. Bài làm sẽ được tự động nộp sau 5 giây.",
};

export {
	ERROR_CODE_CLASS_ACCESS_DENIED,
	HTTP_STATUS_FORBIDDEN,
} from "./httpErrors";
