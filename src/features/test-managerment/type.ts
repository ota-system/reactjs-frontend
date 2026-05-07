import type { Role } from "@/shared/type";

export type ClassResponse = {
	id: string;
	name: string;
	subject: string;
	studentCount: number;
	testCount: number;
	code: string;
	createdAt: string;
	updatedAt: string;
	teacherName?: string;
	teacher?: UserSummary;
};

export type UserSummary = {
	id: string;
	fullName: string;
	email: string;
	avatarUrl?: string;
	role: Role;
};

export type ClassDetail = {
	id: string;
	name: string;
	subject: string;
	code: string;
	teacher: UserSummary;
	createdAt: string;
};

// Just for mock Test card page.
export type TestCardProps = {
	title: string;
	duration: number;
	questionCount: number;
	totalPoints: number;
	tags: string[];
	stats: {
		attempts: number;
		avgScore: number;
		highestScore: number;
	};
};

export type TestSummaryStats = {
	totalStudents: number;
	averageScore: number;
	highestScore: number;
	lowestScore: number;
};

export type TestStudentListItem = {
	id: string;
	studentName: string;
	violations: number;
	score: number;
	totalScore: number;
	percentage: number;
	durationMinutes: number;
	submittedAt: string;
};

export type StudentResponse = {
	id: string;
	studentName: string;
	violations: number;
	score: number;
	totalScore: number;
	percentage: number;
	durationMinutes: number;
	submittedAt: string;
};
