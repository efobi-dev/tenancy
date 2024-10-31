import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentSummarySkeleton() {
	return (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
					<Skeleton className="h-4 w-4" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-8 w-[200px]" />
				</CardContent>
			</Card>
			<Card className="lg:col-span-2">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Recent Payments</CardTitle>
						<Skeleton className="h-4 w-[150px] mt-1" />
					</div>
					<Button variant="outline" disabled>
						<Skeleton className="h-4 w-4 mr-2" />
						<Skeleton className="h-4 w-[100px]" />
					</Button>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						{Array.from({ length: 5 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: key is used for list items
							<li key={index} className="flex justify-between items-center">
								<Skeleton className="h-4 w-[100px]" />
								<Skeleton className="h-4 w-[120px]" />
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</>
	);
}
