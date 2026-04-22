import type { z } from "zod";
import type { CreateClassSchema } from "./schema/CreateClassSchema";

export type CreateClassPayload = z.infer<typeof CreateClassSchema>;
