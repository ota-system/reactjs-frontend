export type Role = "TEACHER" | "STUDENT" | "NULL";

export type UserInfo = {
	id: string;
	username?: string;
	email: string;
	fullName: string;
	role: Role;
	avatarUrl: string | null;
	isActive: boolean;
	createdAt: string;
};

export type ApiResponse<T, M = {}> = {
	message: string;
	data: T;
	metadata?: M;
};

export type ErrorDetail = {
	field: string;
	message: string;
};

export type ErrorResponse = {
	message: string;
	code: string;
	path: string;
	details: ErrorDetail[];
	timestamp: string;
};

export type HttpError = ErrorResponse & { status: number };

export interface PageMetaData {
	page: number;
	limit: number;
	totalPages: number;
}

export type UserSummary = {
	id: string;
	fullName: string;
	email: string;
	avatarUrl?: string;
	role: Role;
};
