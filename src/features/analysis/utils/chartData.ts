import type { GpaDistributionItem } from "../types/dashboard";

export const padDistributionData = (
	data: GpaDistributionItem[],
): GpaDistributionItem[] => {
	const paddedData: GpaDistributionItem[] = [];
	for (let i = 0; i <= 10; i++) {
		const existing = data.find((d) => d.grade === i);
		paddedData.push(existing || { grade: i, count: 0 });
	}
	return paddedData;
};
