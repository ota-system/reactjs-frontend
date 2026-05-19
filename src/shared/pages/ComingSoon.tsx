import { GrInProgress } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center text-center px-4 size-full">
			{/* Icon */}
			<div className="text-5xl mb-4">
				<GrInProgress width={32} height={32} />
			</div>

			{/* Title */}
			<h1 className="text-2xl font-semibold mb-2">
				Tính năng đang được phát triển
			</h1>

			{/* Description */}
			<p className="text-sm text-gray-500 max-w-md mb-6">
				Chúng tôi đang xây dựng tính năng này để mang lại trải nghiệm tốt hơn
				cho bạn. Hãy quay lại sau nhé!
			</p>

			{/* Actions */}
			<div className="flex gap-3">
				<Button
					variant="outline"
					className="mt-4 cursor-pointer"
					onClick={() => navigate(-1)}
				>
					Quay lại trang trước
				</Button>
				<Button
					variant="outline"
					className="mt-4 cursor-pointer"
					onClick={() => navigate("/", { replace: true })}
				>
					Về trang chủ
				</Button>
			</div>
		</div>
	);
};

export default ComingSoon;
