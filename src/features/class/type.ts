import type { z } from "zod";
import type { UserSummary } from "@/shared/type";
import type { CreateClassSchema } from "./schema/CreateClassSchema";

export type CreateClassPayload = z.infer<typeof CreateClassSchema>;

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

export type TestStats = {
	attempts: number;
	averageScore: number;
	highestScore: number;
};

export type TestWithStatsResponse = {
	id: string;
	testName: string;
	duration: number;
	totalQuestions: number;
	maxScore: number;
	antiCheating: boolean;
	topicName?: string;
	stats: TestStats;
};

export type TeacherOverviewResponse = {
	totalClasses: number;
	totalStudents: number;
	totalTests: number;
};

export type StudentClassStatsResponse = {
	totalClasses: number;
	totalTestResults: number;
	averageScore: number;
};
