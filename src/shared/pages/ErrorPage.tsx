import EdgePage from "@/features/auth/pages/EdgePage";
import NotFound from "@/features/auth/pages/NotFound";
import Unauthorized from "@/features/auth/pages/Unauthorized";
import type { HttpError } from "../type";

const ErrorPage = ({ error }: { error: HttpError }) => {
	if (error) {
		if (error.status === 403) {
			return <Unauthorized description={error.message} />;
		} else if (error.status === 404) {
			return <NotFound description={error.message} />;
		} else if (error.status === 408) {
			return (
				<EdgePage
					title="Yêu cầu đã hết thời gian"
					description={error.message}
				/>
			);
		} else {
			return (
				<EdgePage
					title="Đã có lỗi xảy ra"
					description={
						error.message ||
						"Đã có lỗi xảy ra khi tải bài thi. Vui lòng thử lại sau."
					}
				/>
			);
		}
	}
};

export default ErrorPage;
