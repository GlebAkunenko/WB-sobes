import { z } from "zod";
import { BoxSchema } from "#model/Box.js";

export const BoxDtoSchema = BoxSchema.omit({ id: true, createdAt: true });

export type BoxDto = z.infer<typeof BoxDtoSchema>;
