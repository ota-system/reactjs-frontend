import { z } from "zod";

export const CreateClassSchema = z.object({
	name: z
		.string("Vui lòng nhập giá trị chuỗi")
		.min(2, "Độ dài tối thiểu là 2 kí tự"),
	subject: z
		.string("Vui lòng nhập giá trị chuỗi")
		.min(2, "Độ dài tối thiểu là 2 kí tự"),
});
