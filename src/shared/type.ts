export type Role = "TEACHER" | "STUDENT";

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
