import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useWaitForEmailVerification = (enabled: boolean) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const channel = new BroadcastChannel("auth_channel");

		channel.onmessage = (event) => {
			if (event.data?.type === "EMAIL_VERIFIED") {
				channel.close();
				navigate("/", { replace: true });
			}
		};

		return () => channel.close();
	}, [enabled, navigate]);
};
