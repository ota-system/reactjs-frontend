export type GpaDistributionItem = {
	grade: number;
	count: number;
};

export type GpaAcrossTopicItem = {
	topic: string;
	avg: number;
};

export type StudentScoreItem = {
	student: string;
	score: number;
};

export type AvailableTest = {
	id: string;
	name: string;
	createdAt: string;
};

export type ClassDashboardData = {
	className: string;
	gpaDistribution: GpaDistributionItem[];
	gpaAcrossTopics: GpaAcrossTopicItem[];
	classAvgScore: number;
	availableTests: AvailableTest[];
};

export type TestDashboardData = {
	testId: string | null;
	testName: string | null;
	testGrades: GpaDistributionItem[];
	studentScores: StudentScoreItem[];
};
