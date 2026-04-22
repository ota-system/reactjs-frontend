import type { z } from "zod";
import type { CreateClassSchema } from "./schema/CreateClassSchema";

export type CreateClassPayload = z.infer<typeof CreateClassSchema>;

export type ClassResponse = {
	id: string;
	name: string;
	subject: string;
	studentCount: number;
	examCount: number;
	code: string;
	createdAt: string;
	updatedAt: string;
};

export type UserSummary = {
	id: string;
	fullName: string;
	email: string;
	avatarUrl?: string;
};

export type ClassDetail = {
	id: string;
	name: string;
	subject: string;
	code: string;
	teacher: UserSummary;
	createdAt: string;
};

// Just for mock Exam card page.
export type ExamCardProps = {
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
