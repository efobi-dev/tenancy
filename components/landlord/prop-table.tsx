import { getProperties } from "@/actions/landlord";
import { DataTable } from "../data-table";
import { PropTableLoader } from "../loaders/prop-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { columns } from "./prop-column";

export async function PropTable() {
	const properties = await getProperties();

	const formattedProperties = properties.map((property) => ({
		id: property.id,
		name: property.name,
		location: property.address,
		propertyType: property.type,
		units: property.units.length,
		occupancy: property.units.reduce(
			(acc, unit) => acc + (unit.leases.length > 0 ? 1 : 0),
			0,
		),
		averageRent:
			property.units.reduce((acc, unit) => acc + (unit.rentAmount || 0), 0) /
				property.units.length || 0,
		monthlyRevenue: property.units.reduce(
			(acc, unit) => acc + (unit.leases.length > 0 ? unit.rentAmount || 0 : 0),
			0,
		),
		maintenanceRequests: property.landlord.maintenanceJobs.length,
	}));

	return properties ? (
		<Card className="mt-4 max-w-screen-sm lg:max-w-screen-lg">
			<CardHeader>
				<CardTitle>Properties List</CardTitle>
				<CardDescription>An overview of all properties</CardDescription>
			</CardHeader>

			<CardContent>
				<DataTable columns={columns} data={formattedProperties} />
			</CardContent>
		</Card>
	) : (
		<PropTableLoader />
	);
}
