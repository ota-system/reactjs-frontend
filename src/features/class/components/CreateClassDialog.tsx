import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "@/lib/toast";
import { useCreateClassMutation } from "../hooks/useCreateClassMutation";
import { CreateClassSchema } from "../schema/CreateClassSchema";

type FormValues = {
	name: string;
	subject: string;
};

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const defaultSubjects = ["Toán", "Văn", "Anh"];

const CreateClassDialog = ({ open, onOpenChange }: Props) => {
	const mutation = useCreateClassMutation();

	const onSubmit = async (data: FormValues) => {
		const response = await mutation.mutateAsync(data);

		toast.success(response.message || "Tạo lớp học thành công!");
		onOpenChange(false);
	};

	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(CreateClassSchema),
		defaultValues: {
			name: "",
			subject: "",
		},
	});

	const [subjects, setSubjects] = useState(defaultSubjects);
	const [addingNew, setAddingNew] = useState(false);
	const [newSubject, setNewSubject] = useState("");
	const [pendingSubject, setPendingSubject] = useState<string | null>(null);

	useEffect(() => {
		if (pendingSubject !== null) {
			setValue("subject", pendingSubject);
			setPendingSubject(null);
		}
	}, [pendingSubject, setValue]);

	useEffect(() => {
		if (!open) {
			reset();
			setAddingNew(false);
			setNewSubject("");
			setPendingSubject(null);
		}
	}, [open, reset]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Tạo lớp học</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Tên lớp */}
					<div>
						<p className="text-sm font-medium">Tên lớp</p>
						<Input
							className="mt-1"
							placeholder="Nhập tên lớp"
							{...register("name", {
								required: "Vui lòng nhập tên lớp",
							})}
						/>
						{errors.name && (
							<p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
						)}
					</div>

					{/* Môn học */}
					<div>
						<p className="text-sm font-medium">Môn học</p>

						<Controller
							control={control}
							name="subject"
							rules={{ required: "Vui lòng chọn môn học" }}
							render={({ field }) => {
								const handleAddSubject = () => {
									const value = newSubject.trim();
									if (!value) {
										return;
									}

									if (!subjects.includes(value)) {
										setSubjects((prev) => [...prev, value]);
										setPendingSubject(value);
									} else {
										field.onChange(value);
									}

									setNewSubject("");
									setAddingNew(false);
								};

								return (
									<>
										<Select
											value={field.value}
											onValueChange={(value) => {
												if (value === "add_new") {
													setAddingNew(true);
													return;
												} else {
													setAddingNew(false);
												}
												field.onChange(value);
											}}
										>
											<SelectTrigger className="cursor-pointer transition-colors hover:bg-gray-100">
												<SelectValue placeholder="Chọn môn học" />
											</SelectTrigger>

											<SelectContent>
												{subjects.map((subj) => (
													<SelectItem
														key={subj}
														value={subj}
														className="cursor-pointer transition-colors hover:bg-gray-500"
													>
														{subj}
													</SelectItem>
												))}

												<SelectItem
													value="add_new"
													className="cursor-pointer transition-colors hover:bg-gray-500"
												>
													<div className="flex items-center gap-2">
														<FaPlus size={14} />
														Thêm môn mới
													</div>
												</SelectItem>
											</SelectContent>
										</Select>

										{/* Input thêm mới */}
										{addingNew && (
											<div className="flex gap-2 mt-2">
												<Input
													autoFocus
													placeholder="Nhập môn mới"
													value={newSubject}
													onChange={(e) => setNewSubject(e.target.value)}
													onKeyDown={(e) => {
														if (e.key === "Enter") {
															e.preventDefault();
															handleAddSubject();
														}
													}}
												/>
												<Button
													type="button"
													onClick={handleAddSubject}
													className="cursor-pointer transition-colors hover:bg-gray-500 active:bg-accent/80"
												>
													Thêm
												</Button>
											</div>
										)}
									</>
								);
							}}
						/>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							className="cursor-pointer transition-colors hover:bg-gray-100 active:bg-accent/80"
						>
							Hủy
						</Button>
						<Button
							type="submit"
							className="cursor-pointer transition-colors hover:bg-gray-500 active:bg-accent/80"
						>
							Tạo lớp
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateClassDialog;
