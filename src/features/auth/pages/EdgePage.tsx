import { Button } from "@/components/ui/button";

interface EdgePageProps {
	title: string;
	description: string;
}

const EdgePage = ({ title, description }: EdgePageProps) => {
	return (
		<div className="w-full h-screen bg-gray-100">
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-2xl font-bold text-gray-800 text-center">
					{title}
				</h1>
				<p className="mt-4 text-gray-600 text-center">{description}</p>
				<div className="mt-6 flex flex-row items-center gap-2 justify-center">
					<Button
						variant="outline"
						className="mt-4 cursor-pointer"
						onClick={() => window.history.back()}
					>
						Quay lại trang trước
					</Button>
					<Button
						variant="outline"
						className="mt-4 cursor-pointer"
						onClick={() => (window.location.href = "/")}
					>
						Về trang chủ
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EdgePage;
