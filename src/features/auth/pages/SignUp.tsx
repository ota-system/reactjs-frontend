import AuthToggle from "../components/AuthToggle";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
	const { onSubmit } = useSignUp();

	return (
		<div className="flex justify-center items-center flex-col gap-4 py-6 pt-0">
			<Header />
			<AuthToggle active={"signup"} onChange={() => {}} />
			<SignUpForm onSubmit={onSubmit} />
		</div>
	);
};

export default SignUp;
