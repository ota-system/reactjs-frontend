import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/button";
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
	actionLabel?: string;
	actionVariant?: VariantProps<typeof buttonVariants>["variant"];
	cancelLabel?: string;
	secondaryAction?: {
		label: string;
		action: () => void;
		variant?: VariantProps<typeof buttonVariants>["variant"];
	};
}

const ConfirmedDialog = (props: ConfirmedDialogProps) => {
	const actionLabel = props.actionLabel ?? null;
	const cancelLabel = props.cancelLabel ?? "Hủy";
	const actionVariant = props.actionVariant ?? "outline";

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{props.title}</DialogTitle>
				<DialogDescription>
					{props.description || "Hành động này không thể hoàn tác."}
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				{!actionLabel && (
					<DialogClose asChild>
						<Button type="button" className="cursor-pointer">
							{cancelLabel}
						</Button>
					</DialogClose>
				)}
				{props.secondaryAction && (
					<DialogClose asChild>
						<Button
							type="button"
							variant={props.secondaryAction.variant ?? "outline"}
							onClick={props.secondaryAction.action}
							className="cursor-pointer"
						>
							{props.secondaryAction.label}
						</Button>
					</DialogClose>
				)}
				{actionLabel && (
					<DialogClose asChild>
						<Button
							type="button"
							variant={actionVariant || "outline"}
							onClick={props.action}
							className="cursor-pointer"
						>
							{actionLabel}
						</Button>
					</DialogClose>
				)}
			</DialogFooter>
		</DialogContent>
	);
};

export default ConfirmedDialog;
