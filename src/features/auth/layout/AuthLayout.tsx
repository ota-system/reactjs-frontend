import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fafafa,_#ececec)] p-4 md:p-6">
			<div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] md:min-h-[calc(100vh-3rem)] md:grid-cols-2">
				<section className="flex items-center justify-center px-6 py-10 md:px-10">
					<div className="w-full max-w-md">
						<Outlet />
					</div>
				</section>

				<aside className="relative hidden md:block">
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
