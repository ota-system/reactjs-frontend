import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";

export function ClassCode({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	const onCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		toast.success("Sao chép thành công");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex items-center gap-2 bg-secondary/50 px-2 py-1 rounded border">
			<span className="text-sm font-medium">Mã: {code}</span>
			<button
				type="button"
				onClick={onCopy}
				className="hover:bg-gray-200 p-1 rounded transition-colors cursor-pointer"
			>
				{copied ? (
					<Check className="h-3 w-3 text-green-600" />
				) : (
					<Copy className="h-3 w-3" />
				)}
			</button>
		</div>
	);
}
