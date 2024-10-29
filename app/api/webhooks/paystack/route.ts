import prisma from "@/lib/db";
import { createHmac } from "node:crypto";
import type { VerificationWebhook } from "@/lib/types";
import { env } from "@/lib/env";

export async function POST(req: Request): Promise<Response> {
	try {
		const signature = req.headers.get("x-paystack-signature");
		if (!signature) {
			console.error("Missing signature");
			return new Response("Missing signature", { status: 403 });
		}

		const body = await req.json();
		const hash = createHmac("sha512", env.PAYSTACK_KEY)
			.update(JSON.stringify(body))
			.digest("hex");

		if (hash !== signature) {
			console.error("Invalid signature");
			return new Response("Invalid signature", { status: 403 });
		}

		const event = body as VerificationWebhook;
		if (!event || typeof event.event !== "string") {
			console.error("Invalid webhook payload");
			return new Response("OK", { status: 200 });
		}

		if (event.event === "customeridentification.failed") {
			try {
				await prisma.user.update({
					where: { customer_code: event.data.customer_code },
					data: { isVerified: false },
				});
			} catch (dbError) {
				console.error("Database update error:", dbError);
			}
		}
		const user = await prisma.user.findUnique({
			where: { customer_code: event.data.customer_code },
			select: { id: true, role: true },
		});

		if (user) {
			if (user.role === "LANDLORD") {
				const landlord = await prisma.landlord.create({ data: {} });
				await prisma.user.update({
					where: { id: user.id },
					data: { landlordId: landlord.id },
				});
			} else {
				const tenant = await prisma.tenant.create({ data: {} });
				await prisma.user.update({
					where: { id: user.id },
					data: { tenantId: tenant.id },
				});
			}
		}
		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Paystack webhook error:", error);
		return new Response("Paystack error", { status: 500 });
	}
}
