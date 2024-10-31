"use server";

import prisma from "@/lib/db";
import { unstable_cache as cache } from "next/cache";
import { getAuth } from "./auth";
export async function getProperties() {
	const { user } = await getAuth();
	return cache(
		async () => {
			return prisma.property.findMany({
				where: { landlordId: user?.landlordId as string },
				include: {
					units: {
						include: {
							leases: {
								where: {
									status: "ACTIVE",
								},
							},
						},
					},
					landlord: {
						include: {
							maintenanceJobs: {
								include: {
									tenant: true,
								},
							},
						},
					},
				},
			});
		},
		["properties", user?.landlordId ?? ""],
		{
			revalidate: 60 * 60, // 1 hour
			tags: ["properties"],
		},
	)();
}
