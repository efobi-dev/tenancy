import prisma from "@/lib/db";
import { env } from "@/lib/env";
import type { GetBanks } from "@/lib/types";

export async function GET(): Promise<Response> {
	try {
		const response = await fetch(
			"https://api.paystack.co/bank?country=nigeria&currency=NGN",
			{
				headers: {
					Authorization: `Bearer ${env.PAYSTACK_KEY}`,
				},
			},
		);
		const data: GetBanks = await response.json();
		if (data.status === false) return new Response(null, { status: 500 });
		const banks = await Promise.all(
			data.data.map(async (bank) => {
				return await prisma.bank.createMany({
					data: {
						id: bank.id,
						name: bank.name,
						code: bank.code,
						longcode: bank.longcode,
					},
				});
			}),
		);
		if (!banks) return new Response(null, { status: 500 });
		return new Response(null, { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(null, { status: 500 });
	}
}
