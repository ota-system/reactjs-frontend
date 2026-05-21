import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/useAuthStore";

const RootRedirect = () => {
	const role = useAuthStore((state) => state.userInfo?.role);
	if (role === "STUDENT") {
		return <Navigate to="/my-classes" replace />;
	}
	if (role === "TEACHER") {
		return <Navigate to="/overview" replace />;
	}
	return <Navigate to="/select-role" replace />;
};

export default RootRedirect;
