import type { z } from "zod";
import type { signUpSchema } from "./schema/signUpSchema";

export type SignUpFormValue = z.infer<typeof signUpSchema>;

export type SignUpPayload = Omit<SignUpFormValue, "confirmPassword">;

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
};
