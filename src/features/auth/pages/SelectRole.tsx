import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import { RoleSelectionForm } from "../components/RoleSelectionForm";
import { useUpdateRoleMutation } from "../hooks/useUpdateRoleMutation";

export default function SelectRole() {
	const navigate = useNavigate();
	const mutation = useUpdateRoleMutation();

	const handleSelectRole = async (role: string) => {
		try {
			await mutation.mutateAsync(role.toUpperCase());
			toast.success("Cập nhật vai trò thành công!");
			navigate("/home");
		} catch (error: any) {
			toast.error(error.message || "Cập nhật vai trò thất bại");
		}
	};

	return (
		<div className="flex justify-center items-center flex-col gap-4">
			<RoleSelectionForm
				isPending={mutation.isPending}
				onSelect={handleSelectRole}
			/>
		</div>
	);
}
