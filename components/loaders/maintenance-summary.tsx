import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wrench } from "lucide-react";

export function MaintenanceSummaryLoader() {
	return (
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
					{Array.from({ length: 5 }).map((_, i) => (
						<li
							// biome-ignore lint/suspicious/noArrayIndexKey: key is used to list items
							key={i}
							className="flex justify-between items-center gap-4 p-2 hover:bg-muted/50 rounded-lg"
						>
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-4 w-[80px]" />
							<Skeleton className="h-4 w-[60px]" />
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
