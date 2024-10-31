import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PropTableLoader() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Properties List</CardTitle>
				<CardDescription>An overview of all properties</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-8 w-24" />
					</div>
					{Array.from({ length: 5 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: index used to list items
						<div key={i} className="flex items-center space-x-4">
							<Skeleton className="h-12 w-12" />
							<Skeleton className="h-12 flex-1" />
							<Skeleton className="h-12 w-24" />
							<Skeleton className="h-12 w-24" />
							<Skeleton className="h-12 w-24" />
							<Skeleton className="h-12 w-24" />
							<Skeleton className="h-12 w-24" />
						</div>
					))}
					<div className="flex items-center justify-between">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-8 w-24" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
