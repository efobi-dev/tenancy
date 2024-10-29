import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		PAYSTACK_KEY: z.string(),
		AWS_S3_BUCKET_NAME: z.string(),
		AWS_REGION: z.string(),
		AWS_KEY_ID: z.string(),
		AWS_SECRET_ACCESS_KEY: z.string(),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		PAYSTACK_KEY: process.env.PAYSTACK_KEY,
		AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
		AWS_REGION: process.env.AWS_REGION,
		AWS_KEY_ID: process.env.AWS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});
