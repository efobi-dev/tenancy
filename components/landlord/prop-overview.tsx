import { getProperties } from "@/actions/landlord";
import { Building, DollarSign, Home } from "lucide-react";
import { PropOverviewSkeleton } from "../loaders/prop-overview";
import { Naira } from "../naira";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export async function PropOverview() {
	const properties = await getProperties();

	// Calculate metrics from properties data
	const totalProperties = properties.length;
	const totalUnits = properties.reduce(
		(sum, prop) => sum + prop.units.length,
		0,
	);
	const occupiedUnits = properties.reduce(
		(sum, prop) =>
			sum + prop.units.filter((unit) => unit.leases.length > 0).length,
		0,
	);
	const vacantUnits = totalUnits - occupiedUnits;
	const averageOccupancy = (occupiedUnits / totalUnits) * 100 || 0;

	const totalRevenue = properties.reduce(
		(sum, prop) =>
			sum +
			prop.units.reduce(
				(unitSum, unit) => unitSum + (unit.leases[0]?.rentAmount || 0),
				0,
			),
		0,
	);

	const averageRent = totalUnits > 0 ? totalRevenue / totalUnits : 0;

	const totalRentCollected = properties.reduce(
		(sum, prop) =>
			sum +
			prop.units.reduce(
				(unitSum, unit) => unitSum + (unit.leases[0]?.rentAmount || 0),
				0,
			),
		0,
	);
	const averageRentCollectionRate =
		totalRevenue > 0 ? (totalRentCollected / totalRevenue) * 100 : 0;

	const totalMaintenanceRequests = properties.reduce(
		(sum, prop) => sum + prop.landlord.maintenanceJobs.length,
		0,
	);

	return properties ? (
		<div className="grid gap-6 lg:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Occupancy Overview
					</CardTitle>
					<Building className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{averageOccupancy.toFixed(1)}%
					</div>
					<p className="text-xs text-muted-foreground">
						Average Occupancy Rate
					</p>
					<div className="mt-4 grid grid-cols-2 gap-4 text-sm">
						<div>
							<div className="font-semibold">{occupiedUnits}</div>
							<p className="text-xs text-muted-foreground">Occupied Units</p>
						</div>
						<div>
							<div className="font-semibold">{vacantUnits}</div>
							<p className="text-xs text-muted-foreground">Vacant Units</p>
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
					<div className="text-2xl font-bold">
						<Naira value={totalRevenue} />
					</div>
					<p className="text-xs text-muted-foreground">Total Monthly Revenue</p>
					<div className="mt-4 grid grid-cols-2 gap-4 text-sm">
						<div>
							<div className="font-semibold">
								<Naira value={averageRent} />
							</div>
							<p className="text-xs text-muted-foreground">Average Rent</p>
						</div>
						<div>
							<div className="font-semibold">
								{averageRentCollectionRate.toFixed(1)}%
							</div>
							<p className="text-xs text-muted-foreground">
								Rent Collection Rate
							</p>
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
					<div className="text-2xl font-bold">{totalProperties}</div>
					<p className="text-xs text-muted-foreground">Total Properties</p>
					<div className="mt-4 grid grid-cols-2 gap-4 text-sm">
						<div>
							<div className="font-semibold">{totalUnits}</div>
							<p className="text-xs text-muted-foreground">Total Units</p>
						</div>
						<div>
							<div className="font-semibold">{totalMaintenanceRequests}</div>
							<p className="text-xs text-muted-foreground">
								Maintenance Requests
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	) : (
		<PropOverviewSkeleton />
	);
}
