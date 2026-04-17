import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "../schema/SignInSchema";
import type { SignInFormValue, SignInPayload } from "../type";

type Props = {
	handleSubmit: (
		payload: SignInPayload,
		form: ReturnType<typeof useForm<SignInFormValue>>,
	) => void;
	isPending: boolean;
};

const SignInForm = ({ handleSubmit, isPending }: Props) => {
	const form = useForm<SignInFormValue>({
		resolver: zodResolver(SignInSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<fieldset disabled={isPending} className="w-full">
			<form
				onSubmit={form.handleSubmit((data) => {
					handleSubmit(data, form);
				})}
				className="
                w-full max-w-md
                flex flex-col gap-4
            "
			>
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
					{isPending ? "Đang xử lý..." : "Đăng Nhập"}
				</Button>
			</form>
		</fieldset>
	);
};

const inputClass = `rounded-lg py-4`;

export default SignInForm;
