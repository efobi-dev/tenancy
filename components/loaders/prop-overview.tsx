import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, DollarSign, Home } from "lucide-react";

export function PropOverviewSkeleton() {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Occupancy Overview
					</CardTitle>
					<Building className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-8 w-[100px]" />
					<Skeleton className="mt-1 h-3 w-[140px]" />
					<div className="mt-4 grid grid-cols-2 gap-4 text-sm">
						<div>
							<Skeleton className="h-5 w-[60px]" />
							<Skeleton className="mt-1 h-3 w-[80px]" />
						</div>
						<div>
							<Skeleton className="h-5 w-[60px]" />
							<Skeleton className="mt-1 h-3 w-[80px]" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Financial Metrics
					</CardTitle>
					<DollarSign className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-8 w-[120px]" />
					<Skeleton className="mt-1 h-3 w-[140px]" />
					<div className="mt-4 grid grid-cols-2 gap-4 text-sm">
						<div>
							<Skeleton className="h-5 w-[60px]" />
							<Skeleton className="mt-1 h-3 w-[80px]" />
						</div>
						<div>
							<Skeleton className="h-5 w-[60px]" />
							<Skeleton className="mt-1 h-3 w-[80px]" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Property Insights
					</CardTitle>
					<Home className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-8 w-[100px]" />
					<Skeleton className="mt-1 h-3 w-[140px]" />
					<div className="mt-4 grid grid-cols-2 gap-4 text-sm">
						<div>
							<Skeleton className="h-5 w-[60px]" />
							<Skeleton className="mt-1 h-3 w-[80px]" />
						</div>
						<div>
							<Skeleton className="h-5 w-[60px]" />
							<Skeleton className="mt-1 h-3 w-[80px]" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
