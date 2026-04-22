import { Check, Copy } from "lucide-react";
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function ClassCode({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	const onCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex items-center gap-2 bg-secondary/50 px-2 py-1 rounded border">
			<span className="text-sm font-medium">Mã: {code}</span>
			<Tooltip open={copied ? true : undefined}>
				<TooltipTrigger asChild>
					<button
						type="button"
						onClick={onCopy}
						className="hover:bg-gray-200 p-1 rounded transition-colors cursor-pointer"
					>
						{copied ? (
							<Check className="size-3 text-green-600" />
						) : (
							<Copy className="size-3" />
						)}
					</button>
				</TooltipTrigger>
				<TooltipContent side="top">
					{copied ? "Đã sao chép!" : "Sao chép mã"}
				</TooltipContent>
			</Tooltip>
		</div>
	);
}
