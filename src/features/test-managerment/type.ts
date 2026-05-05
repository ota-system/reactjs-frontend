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
