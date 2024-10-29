import type { NextConfig } from "next";
import { env } from "./lib/env";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "2mb",
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: `${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com`,
			},
		],
	},
};

export default nextConfig;
