import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/lib/toast";
import { tokenService } from "@/lib/tokens";
import type { HttpError } from "@/shared/type";
import { useVerifyMutation } from "../hooks/useVerifyMutation";

const VerifyEmail = () => {
	const location = useLocation();
	const token = new URLSearchParams(location.search).get("token");

	const mutation = useVerifyMutation();
	const channel = new BroadcastChannel("auth_channel");

	const [countdown, setCountdown] = useState<number | null>(null);

	const handleClose = () => {
		channel.postMessage({ type: "EMAIL_VERIFIED" });
		setTimeout(() => {
			channel.close();
			window.close();
		}, 300);
	};

	useEffect(() => {
		if (!token) {
			return;
		}

		mutation.mutate(token, {
			onSuccess: (res) => {
				toast.success(res.message || "Xác thực email thành công!");
				tokenService.setTokens(res.data.accessToken, res.data.refreshToken);
				setCountdown(5);
			},
			onError: (error: unknown) => {
				const err = error as HttpError;
				toast.error(err.message || "Xác thực email thất bại");
			},
		});
	}, [token]);

	useEffect(() => {
		if (countdown === null) {
			return;
		}
		if (countdown === 0) {
			handleClose();
			return;
		}

		const timer = setTimeout(() => {
			setCountdown((prev) => (prev ? prev - 1 : 0));
		}, 1000);

		return () => clearTimeout(timer);
	}, [countdown]);

	return (
		<div className="flex items-center justify-center h-screen w-full flex-col gap-4 text-center">
			{mutation.isPending && <p>Đang xác thực email...</p>}

			{mutation.isError && <p className="text-red-500">Xác thực thất bại!</p>}

			{mutation.isSuccess && (
				<>
					<p className="text-green-600 font-medium">
						Email đã được xác thực thành công
					</p>

					<p className="text-muted-foreground">
						Cửa sổ sẽ tự đóng sau{" "}
						<span className="font-bold text-foreground">{countdown}s</span>
					</p>
				</>
			)}

			{mutation.error && (
				<p className="text-red-500">{mutation.error.message}</p>
			)}
		</div>
	);
};

export default VerifyEmail;
