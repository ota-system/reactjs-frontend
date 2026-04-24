import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/lib/toast";
import useClassPreviewQuery from "../hooks/useClassPreviewQuery";
import { useJoinClassMutation } from "../hooks/useJoinClassMutation";
import ClassPreviewSection from "./ClassPreviewSection";

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
	const mutation = useJoinClassMutation();
	const [previewCode, setPreviewCode] = useState<string>();
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(JoinClassSchema),
		defaultValues: { code: "" },
	});

	const {
		data,
		isFetching: isLoadingPreview,
		isError: isPreviewError,
	} = useClassPreviewQuery(previewCode);

	const classPreview = data?.data;

	const onSubmitPreview = ({ code }: FormValues) => {
		setPreviewCode(code);
	};

	const onConfirmJoin = async () => {
		if (!previewCode) {
			return;
		}

		try {
			await mutation.mutateAsync(classPreview!.id);
			toast.success("Tham gia lớp thành công!");
			onOpenChange(false);
			navigate(`/classes/${classPreview!.id}/exams`);
		} catch (error: any) {
			toast.error(error.message || "Tham gia lớp thất bại");
		}
	};

	const handleBack = () => setPreviewCode(undefined);

	useEffect(() => {
		if (!open) {
			reset();
			setPreviewCode(undefined);
		}
	}, [open, reset]);

	const showPreview = Boolean(previewCode);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[340px] rounded-2xl p-6">
				<DialogHeader className="text-center">
					<DialogTitle className="text-lg">
						{showPreview ? "Xác nhận tham gia" : "Tham gia lớp"}
					</DialogTitle>
				</DialogHeader>

				{!showPreview ? (
					<form
						onSubmit={handleSubmit(onSubmitPreview)}
						className="flex flex-col items-center gap-3 mt-2"
					>
						<Controller
							name="code"
							control={control}
							render={({ field }) => (
								<InputOTP
									maxLength={6}
									value={field.value}
									onChange={(value) => {
										field.onChange(value);
										if (value.length === 6) {
											handleSubmit(onSubmitPreview)();
										}
									}}
									pattern={REGEXP_ONLY_DIGITS}
								>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							)}
						/>

						{errors.code && (
							<p className="text-xs text-red-500 text-center">
								{errors.code.message}
							</p>
						)}

						<div className="flex gap-2 w-full mt-2">
							<Button
								type="button"
								variant="outline"
								className="flex-1 hover:bg-primary/20 cursor-pointer"
								onClick={() => onOpenChange(false)}
							>
								Hủy
							</Button>
							<Button
								type="submit"
								className="flex-1 hover:bg-primary/90 cursor-pointer"
							>
								Tiếp tục
							</Button>
						</div>
					</form>
				) : (
					<ClassPreviewSection
						previewCode={previewCode}
						classPreview={classPreview}
						isLoading={isLoadingPreview}
						isError={isPreviewError}
						isJoining={mutation.isPending}
						onBack={handleBack}
						onConfirm={onConfirmJoin}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default JoinClassDialog;
