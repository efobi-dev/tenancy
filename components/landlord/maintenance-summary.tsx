import prisma from "@/lib/db";
import type { User } from "@prisma/client";
import { Wrench } from "lucide-react";
import { MaintenanceSummaryLoader } from "../loaders/maintenance-summary";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

export async function MaintenanceSummary({ user }: { user: User }) {
	const maintenance = await prisma.maintenanceJob.findMany({
		where: { landlordId: user.landlordId ?? undefined },
		take: 5,
		orderBy: { createdAt: "desc" },
	});

	return maintenance ? (
		<Card className="lg:col-span-2">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>Pending Maintenance</CardTitle>
					<CardDescription>Issues reported by tenants</CardDescription>
				</div>
				<Button variant="outline">
					<Wrench className="mr-2 h-4 w-4" />{" "}
					<span className="hidden lg:block">All Requests</span>
				</Button>
			</CardHeader>
			<CardContent>
				<ul className="space-y-2">
					{maintenance.map((request) => (
						<li
							key={request.id}
							className="flex justify-between items-center gap-4 p-2 hover:bg-muted/50 rounded-lg"
						>
							<span className="flex-1 truncate">{request.title}</span>
							<span className="text-sm text-muted-foreground whitespace-nowrap">
								{request.status}
							</span>
							<span className="text-sm text-muted-foreground whitespace-nowrap">
								{request.priority}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	) : (
		<MaintenanceSummaryLoader />
	);
}
