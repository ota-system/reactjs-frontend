import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import type { HttpError } from "@/shared/type";
import useVerify from "../hooks/useVerify";

const VerifyEmail = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const token = queryParams.get("token");

	const [error, setError] = useState<string>();
	const { onVerify } = useVerify();
	const navigate = useNavigate();

	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) {
			return;
		}
		hasRun.current = true;

		const verify = async () => {
			if (!token) {
				setError("Token không hợp lệ");
				return;
			}

			try {
				await onVerify(token);

				toast.success("Xác thực email thành công!");

				setTimeout(() => {
					navigate("/");
				}, 500);
			} catch (error) {
				const err = error as HttpError;

				const message = err.message || "Xác thực email thất bại";

				toast.error(message);
				setError(message);
			}
		};

		verify();
	}, [token]);

	return (
		<div className="flex items-center justify-center h-full">
			<p>{error ? error : "Đang xác thực email..."}</p>
		</div>
	);
};

export default VerifyEmail;
