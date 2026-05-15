import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/useAuthStore";

const RootRedirect = () => {
	const role = useAuthStore((state) => state.userInfo?.role);
	if (role === "STUDENT") {
		return <Navigate to="/my-classes" replace />;
	}
	return <Navigate to="/overview" replace />;
};

export default RootRedirect;
