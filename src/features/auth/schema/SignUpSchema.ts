import { z } from "zod";

export const SignUpSchema = z
	.object({
		fullName: z
			.string("Vui lòng nhập giá trị chữ")
			.min(2, "Độ dài tối thiểu là 2 kí tự")
			.regex(
				/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
				"Chỉ được nhập chữ và số, không bao gồm ký tự đặc biệt",
			)
			.trim(),
		email: z.email("Vui lòng nhập đúng định dạng email").trim(),
		password: z
			.string("Vui lòng nhập giá trị chuỗi")
			.regex(/^\S*$/, "Không được chứa khoảng trắng")
			.min(6, "Độ dài tối thiểu là 6 kí tự"),
		confirmPassword: z.string(),
		role: z.enum(["STUDENT", "TEACHER"]),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu không khớp",
		path: ["confirmPassword"],
	});
