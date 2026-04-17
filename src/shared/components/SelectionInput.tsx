import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SelectionInputProps {
	value: string;
	options?: string[];
	onValueChange: (value: string) => void;
	disabled?: boolean;
	placeholder: string;
	label: string;
}

const SelectionInput = ({
	value,
	onValueChange,
	disabled,
	options,
	placeholder,
	label,
}: SelectionInputProps) => {
	return (
		<div className="space-y-2">
			<Label className="text-base font-semibold">{label}</Label>
			<Select value={value} onValueChange={onValueChange} disabled={disabled}>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options?.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectionInput;
