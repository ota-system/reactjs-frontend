import type { z } from "zod";
import type { SignInSchema } from "./schema/SignInSchema";
import type { SignUpSchema } from "./schema/SignUpSchema";

export type SignUpFormValue = z.infer<typeof SignUpSchema>;

export type SignInFormValue = z.infer<typeof SignInSchema>;

export type SignUpPayload = Omit<SignUpFormValue, "confirmPassword">;

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
};

export type SignInPayload = z.infer<typeof SignInSchema>;
