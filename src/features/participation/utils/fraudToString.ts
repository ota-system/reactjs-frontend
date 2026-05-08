import { fraudMessages } from "../constants/fraudMessages";

export const fraudToString = (
	fraud: { type: string; times: number }[],
): string => {
	return fraud
		.map(
			(f) => `${fraudMessages[f.type] || "Hành vi gian lận"} (${f.times} lần)`,
		)
		.join("\n");
};
