import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const GoogleSection = ({ onGoogleLogin }: { onGoogleLogin: () => void }) => {
	return (
		<div className="flex flex-col items-center justify-center mt-8 w-full">
			<div className="relative w-full mb-6">
				<div className="absolute inset-0 flex items-center">
					<Separator className="w-full" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Hoặc đăng nhập với
					</span>
				</div>
			</div>

			<Button
				variant="outline"
				className="w-full cursor-pointer"
				onClick={onGoogleLogin}
			>
				<FcGoogle className="mr-2 size-4" /> Tiếp tục với Google
			</Button>
		</div>
	);
};

export default GoogleSection;
