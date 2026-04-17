import { z } from "zod";

export const SignInSchema = z.object({
	email: z.email("Vui lòng nhập đúng định dạng email").trim(),
	password: z
		.string("Vui lòng nhập giá trị chuỗi")
		.regex(/^\S*$/, "Không được chứa khoảng trắng")
		.min(6, "Độ dài tối thiểu là 6 kí tự"),
});
