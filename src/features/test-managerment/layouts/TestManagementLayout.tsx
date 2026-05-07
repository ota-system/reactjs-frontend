import { Outlet } from "react-router-dom";

const TestManagementLayout = () => {
	return (
		<div className="p-4 md:p-8 space-y-6 w-full mx-auto">
			{/* Header */}
			<div>
				<h1 className="text-2xl md:text-3xl font-semibold">Bài thi</h1>
				<p className="text-muted-foreground text-sm">
					Quản lý kết quả thi của học sinh trong lớp học.
				</p>
			</div>
			<Outlet />
		</div>
	);
};
export default TestManagementLayout;
