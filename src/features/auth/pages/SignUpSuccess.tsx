import { SiTicktick } from "react-icons/si";
import { Button } from "@/components/ui/button";

const SignUpSuccess = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[80%] w-full gap-4 py-6">
			<SiTicktick size={32} color="#22c55e" />
			<p>Đăng kí thành công!</p>
			<p>Vui lòng kiểm tra email để xác nhận tài khoản.</p>
			<Button
				className="cursor-pointer"
				onClick={() => navigation.navigate("/sign-in")}
			>
				Quay về trang đăng nhập
			</Button>
		</div>
	);
};

export default SignUpSuccess;
