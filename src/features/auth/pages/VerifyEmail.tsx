import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import type { HttpError } from "@/shared/type";
import { useVerifyMutation } from "../hooks/useVerifyMutation";

const VerifyEmail = () => {
	const location = useLocation();
	const token = new URLSearchParams(location.search).get("token");

	const navigate = useNavigate();
	const mutation = useVerifyMutation();

	useEffect(() => {
		if (!token) {
			return;
		}

		mutation.mutate(token, {
			onSuccess: (res) => {
				toast.success(res.message || "Xác thực email thành công!");
				setTimeout(() => navigate("/"), 500);
			},
			onError: (error: unknown) => {
				const err = error as HttpError;
				toast.error(err.message || "Xác thực email thất bại");
			},
		});
	}, [token, navigate]);

	return (
		<div className="flex items-center justify-center h-full">
			{mutation.isPending && <p>Đang xác thực email...</p>}
			{mutation.isError && <p>Xác thực thất bại</p>}
		</div>
	);
};

export default VerifyEmail;
