import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { tokenService } from "@/lib/tokens";

const AuthLayout = () => {
	const token = tokenService.getAccessToken();
	const isAuthenticated = token !== null;

	let hasRole = false;

	if (token) {
		const decoded: any = jwtDecode(token);
		hasRole = !!decoded.role && decoded.role !== "GUEST";
	}

	if (isAuthenticated && hasRole) {
		return <Navigate to="/" replace />;
	}

	return (
		<main
			className="
				bg-[radial-gradient(circle_at_top_left,_#fff,_#fbfbfb)]
				min-h-[100dvh]
				xl:grid xl:grid-cols-2
			"
		>
			<section
				className="
					flex justify-center items-center
					px-6 sm:px-10
					min-h-[100dvh] xl:min-h-0
				"
			>
				<div className="w-full max-w-md">
					<Outlet />
				</div>
			</section>

			<aside
				className="
					hidden xl:block
					h-full
					bg-[url('/auth-bg.webp')]
					bg-cover bg-center
				"
			/>
		</main>
	);
};

export default AuthLayout;
