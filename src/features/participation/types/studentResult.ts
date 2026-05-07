export type StudentResult = {
	id: string;
	testName: string;
	className: string;
	score: number;
	correctRate: number;
	timeSpent: number;
	testDate: string;
	fraudCount: number;
};

export type OverallResults = {
	totalTests: number;
	averageScore: number;
	highestScore: number;
	lowestScore: number;
};
