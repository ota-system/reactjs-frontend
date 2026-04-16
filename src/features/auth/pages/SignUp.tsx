import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import type { HttpError } from "@/shared/type";
import AuthToggle from "../components/AuthToggle";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import { useSignUpMutation } from "../hooks/useSignUpMutation";
import type { SignUpPayload } from "../type";

const SignUp = () => {
	const navigate = useNavigate();

	const mutation = useSignUpMutation();

	const handleSubmit = async (payload: SignUpPayload, form: any) => {
		try {
			await mutation.mutateAsync(payload);

			toast.success("Đăng ký thành công!");
			navigate("/sign-up-success");
		} catch (error: any) {
			const err = error as HttpError;

			toast.error(err.message || "Đăng ký thất bại");

			if (err.details) {
				err.details.forEach((detail) => {
					form.setError(detail.field, {
						type: "server",
						message: detail.message,
					});
				});
			}
		}
	};

	return (
		<div className="flex justify-center items-center flex-col gap-4">
			<Header />
			<AuthToggle active={"signup"} />
			<SignUpForm isPending={mutation.isPending} handleSubmit={handleSubmit} />
		</div>
	);
};

export default SignUp;
