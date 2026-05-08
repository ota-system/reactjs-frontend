import type { FraudType } from "../types";

export const fraudMessages: Record<FraudType, string> = {
	"VISIBILITY CHANGE":
		"Bạn đã chuyển tab hoặc cửa sổ trình duyệt trong quá trình làm bài",
	"FULLSCREEN EXIT":
		"Bạn đã thoát khỏi chế độ toàn màn hình trong quá trình làm bài",
};
