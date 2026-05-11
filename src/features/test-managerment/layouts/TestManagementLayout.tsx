import { ArrowLeft } from "lucide-react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TestManagementLayout = () => {
	const navigate = useNavigate();
	const isTestDetailPage = Boolean(useMatch("/test-management/tests/:testId"));

	const handleBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
			return;
		}

		navigate("/test-management");
	};

	return (
		<div className="p-4 md:p-8 space-y-6 w-full mx-auto">
			{/* Header */}
			<div className="flex items-start gap-4">
				{isTestDetailPage && (
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={handleBack}
						aria-label="Quay lại"
						className="cursor-pointer"
					>
						<ArrowLeft className="size-5" />
					</Button>
				)}

				<div>
					<h1 className="text-2xl md:text-3xl font-semibold">Bài thi</h1>
					<p className="text-muted-foreground text-sm">
						Quản lý kết quả thi của học sinh trong lớp học.
					</p>
				</div>
			</div>
			<Outlet />
		</div>
	);
};
export default TestManagementLayout;
