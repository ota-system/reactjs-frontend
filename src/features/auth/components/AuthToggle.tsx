import { Button } from "@/components/ui/button";

type Props = {
	active: "login" | "signup";
	onChange: (value: "login" | "signup") => void;
};

const AuthToggle = ({ active, onChange }: Props) => {
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
