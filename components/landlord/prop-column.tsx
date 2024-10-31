"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Naira } from "../naira";
import { Button } from "../ui/button";
export type Property = {
	id: string;
	name: string;
	location: string;
	units: number;
	occupancy: number;
	propertyType: "APARTMENT" | "HOUSE" | "DUPLEX" | "COMMERCIAL" | "LAND";
	averageRent: number;
	monthlyRevenue: number;
	maintenanceRequests: number;
};

export const columns: ColumnDef<Property>[] = [
	{
		header: ({ column }) => (
			<Button
				variant={"ghost"}
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Name
				<ArrowUpDown className="ml-2 w-4 h-4" />
			</Button>
		),
		accessorKey: "name",
		cell: ({ row }) => (
			<Link
				href={`/landlord/properties/${row.original.id}`}
				className="hover:underline"
			>
				{row.getValue("name")}
			</Link>
		),
	},
	{
		header: "Type",
		accessorKey: "propertyType",
	},
	{
		header: "Location",
		accessorKey: "location",
	},
	{
		header: "Units",
		accessorKey: "units",
	},
	{
		header: ({ column }) => (
			<Button
				variant={"ghost"}
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Occupancy
				<ArrowUpDown className="ml-2 w-4 h-4" />
			</Button>
		),
		accessorKey: "occupancy",
		cell: ({ row }) => <>{row.getValue("occupancy")}%</>,
	},
	{
		header: ({ column }) => (
			<Button
				variant={"ghost"}
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Avg. Rent
				<ArrowUpDown className="ml-2 w-4 h-4" />
			</Button>
		),
		accessorKey: "averageRent",
		cell: ({ row }) => <Naira value={row.getValue("averageRent")} />,
	},
	{
		header: ({ column }) => (
			<Button
				variant={"ghost"}
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Monthly Revenue
				<ArrowUpDown className="ml-2 w-4 h-4" />
			</Button>
		),
		accessorKey: "monthlyRevenue",
		cell: ({ row }) => <Naira value={row.getValue("monthlyRevenue")} />,
	},
	{
		header: ({ column }) => (
			<Button
				variant={"ghost"}
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Maintenance Requests
				<ArrowUpDown className="ml-2 w-4 h-4" />
			</Button>
		),
		accessorKey: "maintenanceRequests",
	},
];
