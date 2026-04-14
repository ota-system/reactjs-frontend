export type Role = "TEACHER" | "STUDENT";

export type ApiResponse<T> = {
	message: string;
	data: T;
};
