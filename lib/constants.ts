import { z } from "zod";
export const signInSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email"),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email"),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
	first_name: z
		.string()
		.min(3, { message: "Name is at least three characters" }),
	last_name: z
		.string()
		.min(3, { message: "Name is at least three characters" }),
	role: z.enum(["ADMIN", "TENANT", "LANDLORD"]).default("TENANT"),
});

export const verifyUserSchema = z.object({
	bvnNumber: z.string().min(11).max(11),
	bankCode: z.string().min(3).max(10),
	accountNumber: z.string().min(10).max(10),
});

export const landlordRoutes = [
	{
		name: "Properties",
		url: "/landlord/properties",
		icon: "Layers",
	},
	{
		name: "Tenants",
		url: "/landlord/tenants",
		icon: "Users2",
	},
	{
		name: "Leases",
		url: "/landlord/leases",
		icon: "Tags",
	},
	{
		name: "Maintenance",
		url: "/landlord/maintenance",
		icon: "Wrench",
	},
	{
		name: "Payments",
		url: "/landlord/payments",
		icon: "CreditCard",
	},
	{
		name: "Messages",
		url: "/landlord/messages",
		icon: "MessageSquareReply",
	},
	{
		name: "Settings",
		url: "/landlord/settings",
		icon: "Settings2",
	},
];

export const tenantRoutes = [
	{
		name: "Lease",
		url: "/tenant/lease",
		icon: "Tag",
	},
	{
		name: "Payments",
		url: "/tenant/payments",
		icon: "CreditCard",
	},
	{
		name: "Maintenance",
		url: "/tenant/maintenance",
		icon: "Wrench",
	},
	{
		name: "Messages",
		url: "/tenant/messages",
		icon: "MessageSquareReply",
	},
	{
		name: "Settings",
		url: "/tenant/settings",
		icon: "Settings2",
	},
];
