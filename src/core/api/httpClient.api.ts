import { tokenService } from "@/lib/tokens";
import type { ErrorResponse, HttpError } from "@/shared/type";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function refreshAccessToken(): Promise<boolean> {
	tokenService.clearAccessToken();
	try {
		const refreshRes = await fetch(`${BASE_URL}/api/v1/auth/refresh-token`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				refreshToken: tokenService.getRefreshToken(),
			}),
		});

		if (!refreshRes.ok) {
			tokenService.clearTokens();
			return false;
		}

		const res = await refreshRes.json().catch(() => ({}));
		if (res && res.data && res.data.accessToken) {
			tokenService.setAccessToken(res.data.accessToken);
			return true;
		}

		tokenService.clearTokens();
		return false;
	} catch (e) {
		tokenService.clearTokens();
		return false;
	}
}

async function request<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const headers = new Headers(options.headers);

	const token = tokenService.getAccessToken();
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	if (options.body && !headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}

	const config: RequestInit = {
		...options,
		headers,
	};

	const response = await fetch(`${BASE_URL}${endpoint}`, config);

	if (response.status === 401) {
		const refreshed = await refreshAccessToken();
		if (refreshed) {
			return request<T>(endpoint, options);
		} else {
			throw new Error("Hết hạn đăng nhập. Vui lòng đăng nhập lại.", {
				cause: "UNAUTHORIZED",
			});
		}
	}

	if (!response.ok) {
		let errorData: Partial<ErrorResponse> = {};

		try {
			errorData = await response.json();
		} catch {}

		const apiError: HttpError = {
			message: errorData.message || "Something went wrong",
			code: errorData.code || "UNKNOWN",
			path: errorData.path || "",
			details: errorData.details || [],
			timestamp: errorData.timestamp || new Date().toISOString(),

			status: response.status,
		};

		throw apiError;
	}

	return response.json();
}

export const httpClient = {
	get: <T>(url: string, options?: RequestInit) =>
		request<T>(url, { ...options, method: "GET" }),

	post: <T>(url: string, body: unknown, options?: RequestInit) =>
		request<T>(url, {
			...options,
			method: "POST",
			body: JSON.stringify(body),
		}),

	patch: <T>(url: string, body: unknown, options?: RequestInit) =>
		request<T>(url, {
			...options,
			method: "PATCH",
			body: JSON.stringify(body),
		}),

	delete: <T>(url: string, options?: RequestInit) =>
		request<T>(url, { ...options, method: "DELETE" }),
};
