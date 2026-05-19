import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function avoidDefaultEvent(e: React.SyntheticEvent | Event) {
	e.preventDefault();
	e.stopPropagation();
}
