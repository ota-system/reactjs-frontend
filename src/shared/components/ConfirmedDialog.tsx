import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmedDialogProps {
	title: string;
	action: () => void;
	description: string;
}

const ConfirmedDialog = (props: ConfirmedDialogProps) => {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{props.title}</DialogTitle>
				<DialogDescription>
					{props.description || "Hành động này không thể hoàn tác."}
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button
					type="button"
					variant="outline"
					onClick={props.action}
					className="cursor-pointer"
				>
					Xác nhận
				</Button>
				<DialogClose asChild>
					<Button type="button" className="cursor-pointer">
						Hủy
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
};

export default ConfirmedDialog;
