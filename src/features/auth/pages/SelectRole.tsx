import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";
import { RoleSelectionDialog } from "../components/RoleSelectionDialog";
import { useSelectRoleMutation } from "../hooks/useSelectRoleMutation";

export default function SelectRole() {
	const navigate = useNavigate();
	const mutation = useSelectRoleMutation();

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
		<div className="flex justify-center items-center h-screen w-full">
			<RoleSelectionDialog isOpen={true} onSelect={handleSelectRole} />
		</div>
	);
}
