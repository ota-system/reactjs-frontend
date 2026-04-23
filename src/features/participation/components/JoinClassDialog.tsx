import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { toast } from "@/lib/toast";

const JoinClassSchema = z.object({
	code: z
		.string()
		.length(6, "Mã lớp phải có 6 ký tự")
		.regex(/^[0-9]+$/, "Mã lớp chỉ được chứa số"),
});

type FormValues = z.infer<typeof JoinClassSchema>;

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const JoinClassDialog = ({ open, onOpenChange }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(JoinClassSchema),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			// TODO: gọi API join class ở đây
			console.log("Join class với mã:", data.code);

			toast.success("Tham gia lớp thành công!");
			onOpenChange(false);
		} catch (error) {
			toast.error("Tham gia lớp thất bại");
		}
	};

	// reset form khi đóng dialog
	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open, reset]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[320px] rounded-2xl p-6">
				<DialogHeader className="text-center">
					<DialogTitle className="text-lg">Tham gia lớp</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col items-center gap-3 mt-2"
				>
					{/* Input */}
					<Input
						className="text-center tracking-widest text-lg h-10"
						placeholder="Nhập mã 6 số"
						maxLength={6}
						{...register("code")}
					/>

					{/* Error */}
					{errors.code && (
						<p className="text-xs text-red-500 text-center">
							{errors.code.message}
						</p>
					)}

					{/* Actions */}
					<div className="flex gap-2 w-full mt-2">
						<Button
							type="button"
							variant="outline"
							className="flex-1 cursor-pointer"
							onClick={() => onOpenChange(false)}
						>
							Hủy
						</Button>
						<Button
							type="submit"
							className="flex-1 cursor-pointer hover:bg-primary/90"
						>
							Tham gia
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default JoinClassDialog;
