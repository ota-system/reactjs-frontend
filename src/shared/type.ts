export type Role = "TEACHER" | "STUDENT" | "NULL";

export type UserInfo = {
	username: string;
	email: string;
	fullName: string;
	role: Role;
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
