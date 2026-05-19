import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = {
	active: "login" | "signup";
};

const AuthToggle = ({ active }: Props) => {
	const navigate = useNavigate();
	const onChange = (value: "login" | "signup") => {
		navigate(value === "login" ? "/sign-in" : "/sign-up");
	};

	return (
		<div className="flex w-full max-w-sm rounded-full bg-gray-200 p-1">
			<Button
				variant="ghost"
				onClick={() => onChange("login")}
				className={`flex-1 rounded-full py-2 text-sm font-medium transition cursor-pointer ${
					active === "login" ? "bg-white shadow text-black" : "text-gray-600"
				}`}
			>
				Đăng Nhập
			</Button>

			<Button
				variant="ghost"
				onClick={() => onChange("signup")}
				className={`flex-1 rounded-full py-2 text-sm font-medium transition cursor-pointer ${
					active === "signup" ? "bg-white shadow text-black" : "text-gray-600"
				}`}
			>
				Đăng Ký
			</Button>
		</div>
	);
};

export default AuthToggle;
