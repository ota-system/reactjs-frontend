import { toast as sonnerToast } from "sonner";

export const toast = {
	success: (message: string) => {
		sonnerToast.success("Thành công", {
			description: message,
			duration: 1500,
		});
	},

	error: (message: string) => {
		sonnerToast.error("Lỗi", {
			description: message,
			duration: 5000,
		});
	},

	info: (message: string) => {
		sonnerToast.info("Thông tin", {
			description: message,
		});
	},

	loading: (message: string) => {
		sonnerToast.loading("Đang tải", {
			description: message,
		});
	},

	promise: sonnerToast.promise,
};
