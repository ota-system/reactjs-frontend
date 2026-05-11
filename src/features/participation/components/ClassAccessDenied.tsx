import { ShieldAlert, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JoinClassDialog from "./JoinClassDialog";

export default function ClassAccessDenied() {
	const [openJoinDialog, setOpenJoinDialog] = useState(false);

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] size-full text-center space-y-6 px-4">
			<div className="size-20 bg-red-100 rounded-full flex items-center justify-center mb-2">
				<ShieldAlert className="size-10 text-red-600" />
			</div>

			<div className="space-y-2">
				<h2 className="text-2xl font-bold tracking-tight text-foreground">
					Bạn chưa tham gia lớp học này
				</h2>
				<p className="text-muted-foreground max-w-md mx-auto">
					Bạn không có quyền truy cập hoặc lớp học này không tồn tại. Nếu bạn có
					mã lớp, vui lòng tham gia để tiếp tục.
				</p>
			</div>

			<Button
				onClick={() => setOpenJoinDialog(true)}
				className="flex items-center gap-2 px-6 py-6 rounded-xl hover:bg-primary/90 cursor-pointer shadow-md"
			>
				<UserPlus className="size-5" />
				Tham gia ngay
			</Button>

			<JoinClassDialog open={openJoinDialog} onOpenChange={setOpenJoinDialog} />
		</div>
	);
}
