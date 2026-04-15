import { toast } from "@/lib/toast";
import type { ErrorResponse } from "@/shared/type";
import AuthToggle from "../components/AuthToggle";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import useSignUp from "../hooks/useSignUp";
import type { SignUpPayload } from "../type";

const SignUp = () => {
	const { onSubmit, onSuccess } = useSignUp();

	const handleSubmit = async (payload: SignUpPayload, form: any) => {
		try {
			await onSubmit(payload);
			toast.success("Đăng ký thành công!");
			onSuccess();
		} catch (error: any) {
			error = (await error?.json()) || error;
			const err = error as ErrorResponse;
			toast.error(err.message || "Đăng ký thất bại");
			//TODO: CHANGE THE ERROR HANDLING LATER BASED ON TANSTACK QUERY

			if (err.details && err.details.length > 0) {
				err.details.forEach((detail) => {
					form.setError(detail.field as any, {
						type: "server",
						message: detail.message,
					});
				});
				return;
			}
		}
	};

	return (
		<div className="flex justify-center items-center flex-col gap-4 py-6 pt-0">
			<Header />
			<AuthToggle active={"signup"} onChange={() => {}} />
			<SignUpForm handleSubmit={handleSubmit} />
		</div>
	);
};

export default SignUp;
