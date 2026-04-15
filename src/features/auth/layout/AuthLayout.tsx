import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<main
			className="
			bg-[radial-gradient(circle_at_top_left,_#fff,_#fbfbfb)]
			min-h-screen
			xl:grid xl:grid-cols-2
			"
		>
			<section
				className="
				flex justify-center
				px-6 py-10 sm:px-10
				xl:items-center xl:py-0
			"
			>
				<div className="w-full max-w-md">
					<Outlet />
				</div>
			</section>

			<aside
				className="
				hidden xl:block h-screen
				bg-[url('/auth-bg.webp')]
				bg-cover bg-center
			"
			/>
		</main>
	);
};

export default AuthLayout;
