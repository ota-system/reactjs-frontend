import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface FraudWarningDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	message: string;
	container?: HTMLElement | null;
}

export default function FraudWarningDialog({
	open,
	onOpenChange,
	message,
	container,
}: FraudWarningDialogProps) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal container={container || undefined}>
				<Dialog.Overlay className="fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
				<Dialog.Content className="fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
					<div className="flex flex-col gap-2">
						<Dialog.Title className="font-heading text-base leading-none font-medium">
							Cảnh báo
						</Dialog.Title>
						<Dialog.Description className="text-sm text-muted-foreground">
							{message}
						</Dialog.Description>
					</div>

					<div className="-mx-4 -mb-4 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 p-4">
						<Dialog.Close asChild>
							<Button
								type="button"
								variant="default"
								className="cursor-pointer"
							>
								Đã hiểu
							</Button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
