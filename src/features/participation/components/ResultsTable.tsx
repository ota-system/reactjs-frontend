import { AlertCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { StudentResult } from "../types/studentResult";

type TruncatedCellProps = {
	content: string;
	className?: string;
	children?: React.ReactNode;
};

function TruncatedCell({ content, className, children }: TruncatedCellProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span className={`block truncate ${className ?? ""}`}>
					{children ?? content}
				</span>
			</TooltipTrigger>
			<TooltipContent>{content}</TooltipContent>
		</Tooltip>
	);
}

type ResultsTableProps = {
	data: StudentResult[];
};

export function ResultsTable({ data }: ResultsTableProps) {
	const navigate = useNavigate();

	const handleRowClick = (resultId: string) => {
		navigate(`/my-results/${resultId}`);
	};

	return (
		<TooltipProvider>
			<Card className="mt-6 w-full flex flex-col flex-1 min-h-0">
				<CardContent className="p-6 flex flex-col flex-1 min-h-0 space-y-4">
					{/* Header */}
					<div>
						<h2 className="text-lg font-semibold">Lịch sử bài thi</h2>
						<p className="text-sm text-muted-foreground">
							Danh sách tất cả các bài thi bạn đã hoàn thành
						</p>
					</div>

					{/* SCROLL AREA */}
					<div className="flex-1 min-h-0 overflow-auto">
						<Table style={{ tableLayout: "fixed", width: "100%" }}>
							<colgroup>
								<col style={{ width: "22%" }} />
								<col style={{ width: "18%" }} />
								<col style={{ width: "8%" }} />
								<col style={{ width: "8%" }} />
								<col style={{ width: "14%" }} />
								<col style={{ width: "14%" }} />
								<col style={{ width: "16%" }} />
							</colgroup>
							<TableHeader className="sticky top-0 bg-background z-10">
								<TableRow>
									<TableHead>Bài thi</TableHead>
									<TableHead>Lớp học</TableHead>
									<TableHead>Điểm</TableHead>
									<TableHead>Tỷ lệ</TableHead>
									<TableHead>Thời gian</TableHead>
									<TableHead>Ngày thi</TableHead>
									<TableHead>Gian lận</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{data.map((result) => (
									<TableRow
										className="cursor-pointer"
										key={result.id}
										onClick={() => handleRowClick(result.id)}
									>
										<TableCell className="max-w-0 text-muted-foreground">
											<TruncatedCell content={result.testName} />
										</TableCell>
										<TableCell className="max-w-0 text-muted-foreground">
											<TruncatedCell content={result.className} />
										</TableCell>
										<TableCell>{result.score}</TableCell>
										<TableCell>
											<Badge variant="secondary">{result.correctRate}%</Badge>
										</TableCell>
										<TableCell className="max-w-0">
											<TruncatedCell
												content={`${result.timeSpent} phút`}
												className="flex items-center gap-1 text-muted-foreground"
											>
												<Clock className="w-4 h-4 shrink-0" />
												<span className="truncate">
													{result.timeSpent} phút
												</span>
											</TruncatedCell>
										</TableCell>
										<TableCell className="max-w-0 text-muted-foreground">
											<TruncatedCell
												content={new Date(result.testDate).toLocaleDateString(
													"vi-VN",
												)}
											/>
										</TableCell>
										<TableCell className="max-w-0">
											<TruncatedCell
												content={`${result.fraudCount} cảnh báo`}
												className="flex items-center gap-1 text-orange-500"
											>
												<AlertCircle className="w-4 h-4 shrink-0" />
												<span className="truncate">
													{result.fraudCount} cảnh báo
												</span>
											</TruncatedCell>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</TooltipProvider>
	);
}
