import prisma from "@/lib/db";
import type { User } from "@prisma/client";
import { BadgeDollarSign, ClipboardList } from "lucide-react";
import { PaymentSummarySkeleton } from "../loaders/payment-summary";
import { Naira } from "../naira";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

export async function PaymentSummary({ user }: { user: User }) {
	const currentDate = new Date();
	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	);
	const lastDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0,
	);

	const payments = await prisma.payment.findMany({
		where: {
			lease: {
				unit: {
					property: {
						landlord: {
							User: {
								some: {
									id: user.id,
								},
							},
						},
					},
				},
			},
			status: "COMPLETED",
			paymentDate: {
				gte: firstDayOfMonth,
				lte: lastDayOfMonth,
			},
		},
		orderBy: {
			paymentDate: "desc",
		},
		include: {
			lease: {
				include: {
					unit: {
						include: {
							property: true,
						},
					},
					tenant: {
						include: {
							User: true,
						},
					},
				},
			},
		},
	});

	return payments ? (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
					<BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						<Naira
							value={payments.reduce((sum, payment) => sum + payment.amount, 0)}
						/>
					</div>
				</CardContent>
			</Card>{" "}
			<Card className="lg:col-span-2">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Recent Payments</CardTitle>
						<CardDescription>Latest rent payments received</CardDescription>
					</div>
					<Button variant="outline">
						<ClipboardList className="mr-2 h-4 w-4" />
						<span className="hidden lg:block">Financial Reports</span>
					</Button>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						{payments.map((payment) => (
							<li
								key={payment.id}
								className="flex justify-between items-center"
							>
								<span>{payment.lease.tenant.User[0].first_name}</span>
								<span className="font-semibold">
									<Naira value={payment.amount} />
								</span>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</>
	) : (
		<PaymentSummarySkeleton />
	);
}
