import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";
import { LuBookOpen } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "../schema/signUpSchema";
import useAuthStore from "../stores/authStore";
import type { SignUpPayload } from "../type";

type Props = {
	onSubmit: (payload: SignUpPayload) => void;
};

const SignUpForm = ({ onSubmit }: Props) => {
	const { loading } = useAuthStore();
	const form = useForm<SignUpPayload>({
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
		<fieldset disabled={loading} className="w-full">
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-5 w-full max-w-md"
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
								placeholder="Họ và tên"
								className={inputClass(fieldState.error !== undefined)}
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
								className={inputClass(fieldState.error !== undefined)}
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
								className={inputClass(fieldState.error !== undefined)}
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
								className={inputClass(fieldState.error !== undefined)}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Role Selection */}
				<Controller
					name="role"
					control={form.control}
					render={({ field }) => (
						<div className="flex gap-4">
							{/* Student */}
							<button
								type="button"
								onClick={() => field.onChange("STUDENT")}
								className={`flex-1 flex items-center gap-2 rounded-xl border px-4 py-3 transition
                ${
									field.value === "STUDENT"
										? "border-black bg-gray-100"
										: "border-gray-300"
								}`}
							>
								<span className="text-lg">
									<FaRegUserCircle />
								</span>
								<span>Học sinh</span>
							</button>

							{/* Teacher */}
							<button
								type="button"
								onClick={() => field.onChange("TEACHER")}
								className={`flex-1 flex items-center gap-2 rounded-xl border px-4 py-3 transition
                ${
									field.value === "TEACHER"
										? "border-black bg-gray-100"
										: "border-gray-300"
								}`}
							>
								<span className="text-lg">
									<LuBookOpen />
								</span>
								<span>Giáo viên</span>
							</button>
						</div>
					)}
				/>

				{/* Submit */}
				<Button
					type="submit"
					className={`mt-4 w-full rounded-xl py-6 text-white font-medium shadow-md hover:opacity-90 transition ${loading ? "cursor-not-allowed opacity-70 disabled bg-gray-500" : "bg-black cursor-pointer"}`}
				>
					{loading ? "Đang xử lý..." : "Đăng Ký"}
				</Button>
			</form>
		</fieldset>
	);
};

const inputClass = (error: boolean) =>
	`rounded-lg ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`;

export default SignUpForm;
