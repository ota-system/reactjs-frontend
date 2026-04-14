import type { z } from "zod";
import type { signUpSchema } from "./schema/signUpSchema";

export type SignUpPayload = z.infer<typeof signUpSchema>;

export type SignUpResponse = {
	accessToken: string;
	refreshToken: string;
};
