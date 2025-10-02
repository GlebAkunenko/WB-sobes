import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    POSTGRES_HOST: z.union([z.undefined(), z.string()]),
    POSTGRES_INTERNAL_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    APP_PORT: z.union([
        z.undefined(),
        z
            .string()
            .regex(/^[0-9]+$/)
            .transform((value) => parseInt(value)),
    ]),
    WB_TOKEN: z.string(),
    WB_API_BASE_URL: z.string(),
    SHEET_ID: z.string(),
    SHEET_PAGE_NAME: z.string(),
});

const env = envSchema.parse({
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_INTERNAL_PORT: process.env.POSTGRES_INTERNAL_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    WB_TOKEN: process.env.WB_TOKEN,
    WB_API_BASE_URL: process.env.WB_API_BASE_URL,
    SHEET_ID: process.env.SHEET_ID,
    SHEET_PAGE_NAME: process.env.SHEET_PAGE_NAME,
});

export default env;
