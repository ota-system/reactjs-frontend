import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<main className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#fff,_#fbfbfb)]">
			<div className="grid h-full md:grid-cols-2">
				<section className="h-full overflow-y-auto hide-scrollbar px-6 py-6 md:px-10 flex justify-center">
					<div className="w-full max-w-md origin-top scale-100 md:scale-120">
						<Outlet />
					</div>
				</section>

				<aside className="hidden md:block h-full">
					<img
						src="/auth-bg.webp"
						alt="English learning"
						className="h-full w-full object-cover"
					/>
				</aside>
			</div>
		</main>
	);
};

export default AuthLayout;
