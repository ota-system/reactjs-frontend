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
