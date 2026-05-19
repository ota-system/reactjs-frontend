import { Switch } from "@/components/ui/switch";

interface ToggleRowProps {
	title: string;
	description: string;
	checked: boolean;
	onToggle: (value: boolean) => void;
	disabled?: boolean;
}

const ToggleRow = ({
	title,
	description,
	checked,
	onToggle,
	disabled = false,
}: ToggleRowProps) => {
	return (
		<div className="flex items-start justify-between gap-4">
			<div>
				<p className="text-base font-medium">{title}</p>
				<p className="text-base text-muted-foreground">{description}</p>
			</div>
			<Switch
				checked={checked}
				onCheckedChange={onToggle}
				aria-label={title}
				className="cursor-pointer"
				disabled={disabled}
			/>
		</div>
	);
};

export default ToggleRow;
