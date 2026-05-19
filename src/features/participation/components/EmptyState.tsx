export function EmptyState({ message }: { message: string }) {
	return (
		<div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
			<div className="size-16 rounded-full bg-muted flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-7 h-7 text-muted-foreground"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={1.5}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3 3v18h18M7 16l4-4 4 4 4-4"
					/>
				</svg>
			</div>
			<p className="text-muted-foreground text-sm max-w-xs">{message}</p>
		</div>
	);
}
