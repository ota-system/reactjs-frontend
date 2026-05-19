import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as PaginationRoot,
} from "@/components/ui/pagination";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: PaginationProps) => {
	if (totalPages <= 1) {
		return null;
	}

	const pages: (number | string)[] = [];
	const showEllipsis = totalPages > 7;

	if (!showEllipsis) {
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
	} else {
		if (currentPage <= 4) {
			pages.push(1, 2, 3, 4, 5, "...", totalPages);
		} else if (currentPage >= totalPages - 3) {
			pages.push(
				1,
				"...",
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages,
			);
		} else {
			pages.push(
				1,
				"...",
				currentPage - 1,
				currentPage,
				currentPage + 1,
				"...",
				totalPages,
			);
		}
	}

	return (
		<PaginationRoot className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					/>
				</PaginationItem>

				{pages.map((page, index) => {
					if (page === "...") {
						const prevPage = pages[index - 1];
						const nextPage = pages[index + 1];
						return (
							<PaginationItem key={`ellipsis-${prevPage}-${nextPage}`}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					}

					return (
						<PaginationItem key={page}>
							<PaginationLink
								onClick={() => onPageChange(page as number)}
								isActive={currentPage === page}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationRoot>
	);
};
