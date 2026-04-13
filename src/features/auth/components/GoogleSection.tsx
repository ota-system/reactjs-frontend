import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const GoogleSection = ({ onGoogleLogin }: { onGoogleLogin: () => void }) => {
	return (
		<div className="flex flex-col items-center justify-center mt-8 px-8">
			<Button
				variant="outline"
				className="w-full cursor-pointer"
				onClick={onGoogleLogin}
			>
				<FcGoogle className="mr-2" /> Tiếp tục với Google
			</Button>
		</div>
	);
};

export default GoogleSection;
