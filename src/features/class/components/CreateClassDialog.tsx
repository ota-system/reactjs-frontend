import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { useSubjectForm } from "../hooks/useSubjectForm";
import { CreateClassSchema } from "../schema/CreateClassSchema";

type FormValues = {
	name: string;
	subject: string;
};

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const CreateClassDialog = ({ open, onOpenChange }: Props) => {
	const mutation = useCreateClassMutation();

	const { state, dispatch } = useSubjectForm();

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

	const onSubmit = async (data: FormValues) => {
		const response = await mutation.mutateAsync(data);
		toast.success(response.message || "Tạo lớp học thành công!");
		onOpenChange(false);
	};

	// biome-ignore lint: correctness/useExhaustiveDependencies
	useEffect(() => {
		if (state.pendingSubject) {
			setValue("subject", state.pendingSubject);
			dispatch({ type: "SET_PENDING", payload: "" });
		}
	}, [state.pendingSubject, setValue]);

	// biome-ignore lint: correctness/useExhaustiveDependencies
	useEffect(() => {
		if (!open) {
			reset();
			dispatch({ type: "RESET" });
		}
	}, [open, reset]);

	const handleSelectChange = (
		value: string,
		onChange: (value: string) => void,
	) => {
		if (value === "add_new") {
			dispatch({ type: "TOGGLE_ADDING", payload: true });
			return;
		}

		dispatch({ type: "TOGGLE_ADDING", payload: false });
		onChange(value);
	};

	const handleAddSubject = () => {
		dispatch({ type: "ADD_SUBJECT" });
	};

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
							{...register("name")}
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
							render={({ field }) => (
								<>
									<Select
										value={field.value}
										onValueChange={(value) =>
											handleSelectChange(value, field.onChange)
										}
									>
										<SelectTrigger className="hover:bg-gray-100 cursor-pointer">
											<SelectValue placeholder="Chọn môn học" />
										</SelectTrigger>

										<SelectContent>
											{state.subjects.map((subj) => (
												<SelectItem
													key={subj}
													value={subj}
													className="hover:bg-gray-100 cursor-pointer"
												>
													{subj}
												</SelectItem>
											))}

											<SelectItem
												value="add_new"
												className="hover:bg-gray-100 cursor-pointer"
											>
												<div className="flex items-center gap-2">
													<FaPlus size={14} />
													Thêm môn mới
												</div>
											</SelectItem>
										</SelectContent>
									</Select>

									{state.addingNew && (
										<div className="flex gap-2 mt-2">
											<Input
												autoFocus
												placeholder="Nhập môn mới"
												value={state.newSubject}
												onChange={(e) =>
													dispatch({
														type: "SET_NEW_SUBJECT",
														payload: e.target.value,
													})
												}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														handleAddSubject();
													}
												}}
											/>
											<Button type="button" onClick={handleAddSubject}>
												Thêm
											</Button>
										</div>
									)}
								</>
							)}
						/>
					</div>

					<DialogFooter>
						<Button
							className="cursor-pointer hover:bg-gray-100"
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Hủy
						</Button>
						<Button className="cursor-pointer hover:bg-gray-500" type="submit">
							Tạo lớp
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateClassDialog;
