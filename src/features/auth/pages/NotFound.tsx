import EdgePage from "./EdgePage";

const NotFound = ({ description }: { description?: string }) => {
	return (
		<EdgePage
			title="Trang không tồn tại"
			description={description || "Trang bạn đang tìm kiếm không tồn tại."}
		/>
	);
};

export default NotFound;
