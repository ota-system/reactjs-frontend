import { useEffect, useState } from "react";

interface CountdownSectionProps {
	startedTime: string;
	durationMinutes: number;
	hasAttempted: boolean;
	onStatusChange?: (isStarted: boolean, isEnded: boolean) => void;
}

const formatTime = (ms: number) => {
	if (ms <= 0) {
		return "00";
	}
	const hours = Math.floor(ms / (1000 * 60 * 60));
	const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((ms % (1000 * 60)) / 1000);

	const parts = [];
	if (hours > 0) {
		parts.push(`${hours} giờ`);
	}
	if (minutes > 0 || hours > 0) {
		parts.push(`${minutes} phút`);
	}
	parts.push(`${seconds} giây`);

	return parts.join(" ");
};

export default function CountdownSection({
	startedTime,
	durationMinutes,
	hasAttempted,
	onStatusChange,
}: CountdownSectionProps) {
	const [timeLeft, setTimeLeft] = useState<string>("");
	const [label, setLabel] = useState<string>("");
	const [status, setStatus] = useState<"upcoming" | "ongoing" | "ended">(
		"upcoming",
	);

	useEffect(() => {
		const calculate = () => {
			const now = new Date();
			const start = new Date(startedTime);
			const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

			if (now < start) {
				const diff = start.getTime() - now.getTime();
				setTimeLeft(formatTime(diff));
				setLabel("Bài thi sẽ bắt đầu sau:");
				setStatus("upcoming");
				onStatusChange?.(false, false);
			} else if (now >= start && now < end) {
				const diff = end.getTime() - now.getTime();
				setTimeLeft(formatTime(diff));
				setLabel("Thời gian làm bài còn lại:");
				setStatus("ongoing");
				onStatusChange?.(true, false);
			} else {
				setTimeLeft("00");
				setLabel("Bài thi đã kết thúc");
				setStatus("ended");
				onStatusChange?.(true, true);
			}
		};

		calculate();
		const timer = setInterval(calculate, 1000);
		return () => clearInterval(timer);
	}, [startedTime, durationMinutes, onStatusChange]);

	if (hasAttempted) {
		return null;
	}

	const getContainerStyles = () => {
		switch (status) {
			case "upcoming":
				return "bg-indigo-50 border-indigo-100 text-indigo-700";
			case "ongoing":
				return "bg-green-50 border-green-100 text-green-700";
			case "ended":
				return "bg-red-50 border-red-100 text-red-700";
			default:
				return "";
		}
	};

	return (
		<div
			className={`border rounded-xl p-6 text-center space-y-2 ${getContainerStyles()}`}
		>
			<p className="text-sm font-medium opacity-80">{label}</p>
			<p className="text-3xl font-bold">{timeLeft}</p>
		</div>
	);
}
