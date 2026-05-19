import EdgePage from "./EdgePage";

const Unauthorized = ({ description }: { description?: string }) => {
	return (
		<EdgePage
			title="Không có quyền truy cập"
			description={description || "Bạn không có quyền truy cập vào trang này."}
		/>
	);
};

export default Unauthorized;
