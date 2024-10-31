import { getProperties } from "@/actions/landlord";
import { Building, Home, UserIcon } from "lucide-react";
import { PropertiesSummarySkeleton } from "../loaders/prop-summary";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

export async function PropertiesSummary() {
	const properties = await getProperties();
	const totalProperties = properties.length;
	const totalUnits = properties.reduce(
		(acc, property) => acc + property.units.length,
		0,
	);
	const occupiedUnits = properties.reduce((acc, property) => {
		return (
			acc + property.units.filter((unit) => unit.status === "OCCUPIED").length
		);
	}, 0);
	const totalTenants = occupiedUnits;
	const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

	return properties ? (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Property Occupancy
					</CardTitle>
					<Building className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
					<Progress value={occupancyRate} className="mt-2" />
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
					<div className="text-2xl font-bold">{totalProperties}</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
					<UserIcon className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalTenants}</div>
				</CardContent>
			</Card>
		</>
	) : (
		<PropertiesSummarySkeleton />
	);
}
