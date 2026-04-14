import { z } from "zod";

export const signUpSchema = z
	.object({
		fullName: z
			.string("Vui lòng nhập giá trị chữ")
			.min(2, "Độ dài tối thiểu là 2"),
		email: z.email("Vui lòng nhập đúng giá trị email"),
		password: z
			.string("Vui lòng nhập giá trị chữ")
			.min(6, "Độ dài tối thiểu là 6"),
		confirmPassword: z.string(),
		role: z.enum(["STUDENT", "TEACHER"]),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu không khớp",
		path: ["confirmPassword"],
	});
