import AuthToggle from "../components/AuthToggle";
import GoogleSection from "../components/GoogleSection";
import Header from "../components/Header";
import SignInForm from "../components/SignInForm";
import { useSignIn } from "../hooks/useSignIn";

const SignIn = () => {
	const { isPending, handleSubmit, loginWithGoogle } = useSignIn();

	return (
		<div className="flex justify-center items-center flex-col gap-4">
			<Header />
			<AuthToggle active={"login"} />
			<SignInForm isPending={isPending} handleSubmit={handleSubmit} />
			<GoogleSection onGoogleLogin={loginWithGoogle} />
		</div>
	);
};

export default SignIn;
