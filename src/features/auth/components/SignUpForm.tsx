import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";
import { LuBookOpen } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "../schema/signUpSchema";
import type { SignUpFormValue, SignUpPayload } from "../type";

type Props = {
	handleSubmit: (
		payload: SignUpPayload,
		form: ReturnType<typeof useForm<SignUpFormValue>>,
	) => void;
	isPending: boolean;
};

const SignUpForm = ({ handleSubmit, isPending }: Props) => {
	const form = useForm<SignUpFormValue>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
			role: "STUDENT",
		},
	});

	return (
		<fieldset disabled={isPending} className="w-full">
			<form
				onSubmit={form.handleSubmit((data) => {
					const { confirmPassword, ...payload } = data;
					handleSubmit(payload, form);
				})}
				className="
				w-full max-w-md
				flex flex-col gap-4
			"
			>
				{/* Full Name */}
				<Controller
					name="fullName"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Họ và tên</FieldLabel>
							<Input
								{...field}
								placeholder="Nguyễn Văn A"
								className={inputClass}
								aria-invalid={!!fieldState.error}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Email */}
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Email</FieldLabel>
							<Input
								{...field}
								type="email"
								placeholder="example@email.com"
								className={inputClass}
								aria-invalid={!!fieldState.error}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Password */}
				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Mật khẩu</FieldLabel>
							<Input
								{...field}
								type="password"
								placeholder="••••••••"
								className={inputClass}
								aria-invalid={!!fieldState.error}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Confirm Password */}
				<Controller
					name="confirmPassword"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Xác nhận mật khẩu</FieldLabel>
							<Input
								{...field}
								type="password"
								placeholder="••••••••"
								className={inputClass}
								aria-invalid={!!fieldState.error}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Role */}
				<Controller
					name="role"
					control={form.control}
					render={({ field }) => (
						<div className="flex gap-3">
							<Button
								variant="ghost"
								type="button"
								onClick={() => field.onChange("STUDENT")}
								className={`flex-1 flex items-center gap-2 rounded-xl border px-4 py-5 transition cursor-pointer
								${
									field.value === "STUDENT"
										? "border-black bg-gray-100"
										: "border-gray-300"
								}`}
							>
								<FaRegUserCircle />
								<span>Học sinh</span>
							</Button>

							<Button
								variant="ghost"
								type="button"
								onClick={() => field.onChange("TEACHER")}
								className={`flex-1 flex items-center gap-2 rounded-xl border px-4 py-5 transition cursor-pointer
								${
									field.value === "TEACHER"
										? "border-black bg-gray-100"
										: "border-gray-300"
								}`}
							>
								<LuBookOpen />
								<span>Giáo viên</span>
							</Button>
						</div>
					)}
				/>

				{/* Submit */}
				<Button
					type="submit"
					className={`
					mt-2 w-full rounded-xl py-5
					text-white font-medium shadow-md
					transition
					cursor-pointer
					${
						isPending
							? "cursor-not-allowed opacity-70 bg-gray-500"
							: "bg-black hover:opacity-90"
					}
				`}
				>
					{isPending ? "Đang xử lý..." : "Đăng Ký"}
				</Button>
			</form>
		</fieldset>
	);
};

const inputClass = `rounded-lg py-4`;

export default SignUpForm;
