import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, Home, User } from "lucide-react";

export function PropertiesSummarySkeleton() {
	return (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Property Occupancy
					</CardTitle>
					<Building className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-8 w-20" />
					<Progress value={0} className="mt-2" />
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Properties
					</CardTitle>
					<Home className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-8 w-20" />
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
					<User className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-8 w-20" />
				</CardContent>
			</Card>
		</>
	);
}
