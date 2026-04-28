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

export type ApiResponse<T> = {
	message: string;
	data: T;
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
