import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import useVerify from "../hooks/useVerify";

const VerifyEmail = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const token = queryParams.get("token");

	const [error, setError] = useState<string>();
	const { onVerify } = useVerify();
	const navigate = useNavigate();

	const hasRun = useRef(false); // ✅ prevent double call

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
			} catch (err: any) {
				const message =
					(await err?.json()?.message) ||
					err.message ||
					"Xác thực email thất bại";
				//TODO: CHANGE THE ERROR HANDLING LATER BASED ON TANSTACK QUERY

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
