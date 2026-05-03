import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import { tokenService } from "@/lib/tokens";
import type { HttpError } from "@/shared/type";
import AuthToggle from "../components/AuthToggle";
import GoogleSection from "../components/GoogleSection";
import Header from "../components/Header";
import SignInForm from "../components/SignInForm";
import { useSignInMutation } from "../hooks/useSignInMutation";
import { useSignInWithGoogleMutation } from "../hooks/useSignInWithGoogleMutation";
import type { SignInPayload } from "../type";

const SignIn = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useSignInMutation();
	const googleMutation = useSignInWithGoogleMutation();

	const loginWithGoogle = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (codeResponse) => {
			if (!codeResponse.code) {
				toast.error("Không nhận được Auth Code từ Google");
				return;
			}
			try {
				const data = await googleMutation.mutateAsync({
					authCode: codeResponse.code,
					uri: "postmessage",
				});
				tokenService.setTokens(data.data.accessToken, data.data.refreshToken);
				await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
				toast.success(data.message || "Đăng nhập Google thành công!");
				navigate("/", { replace: true });
			} catch (error: any) {
				toast.error(error.message || "Đăng nhập Google thất bại");
			}
		},
		onError: () => toast.error("Đăng nhập Google thất bại"),
	});

	const handleSubmit = async (payload: SignInPayload, form: any) => {
		try {
			const data = await mutation.mutateAsync(payload);
			tokenService.setTokens(data.data.accessToken, data.data.refreshToken);
			await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
			toast.success(data.message || "Đăng nhập thành công!");
			navigate("/", { replace: true });
		} catch (error: any) {
			const err = error as HttpError;

			toast.error(err.message || "Đăng nhập thất bại");

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
			<AuthToggle active={"login"} />
			<SignInForm
				isPending={mutation.isPending || googleMutation.isPending}
				handleSubmit={handleSubmit}
			/>
			<GoogleSection onGoogleLogin={loginWithGoogle} />
		</div>
	);
};

export default SignIn;
