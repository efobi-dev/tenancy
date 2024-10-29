import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	Building,
	Home,
	User,
	BadgeDollarSign,
	ClipboardList,
	Wrench,
	Calendar,
} from "lucide-react";

export default function Page() {
	const occupancyRate = 85;
	const recentPayments = [
		{ id: 1, tenant: "John Doe", amount: 1200, date: "2023-06-01" },
		{ id: 2, tenant: "Jane Smith", amount: 950, date: "2023-05-31" },
		{ id: 3, tenant: "Bob Johnson", amount: 1500, date: "2023-05-30" },
	];
	const maintenanceRequests = [
		{
			id: 1,
			property: "123 Main St",
			issue: "Leaky faucet",
			status: "Pending",
		},
		{
			id: 2,
			property: "456 Elm St",
			issue: "Broken AC",
			status: "In Progress",
		},
		{
			id: 3,
			property: "789 Oak St",
			issue: "Clogged drain",
			status: "Pending",
		},
	];
	const upcomingExpirations = [
		{
			id: 1,
			tenant: "Alice Brown",
			property: "321 Pine St",
			expirationDate: "2023-07-15",
		},
		{
			id: 2,
			tenant: "Charlie Davis",
			property: "654 Maple Ave",
			expirationDate: "2023-07-31",
		},
	];
	return (
		<>
			<header className="sticky top-0 backdrop-blur-sm flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Overview</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex-1" />
				<Button className="mr-4">Add property</Button>
			</header>{" "}
			<main>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4 pt-0">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Property Occupancy
							</CardTitle>
							<Building className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{occupancyRate}%</div>
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
							<div className="text-2xl font-bold">12</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Tenants
							</CardTitle>
							<User className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">28</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Monthly Revenue
							</CardTitle>
							<BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">$24,500</div>
						</CardContent>
					</Card>

					<Card className="lg:col-span-2">
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>Recent Payments</CardTitle>
								<CardDescription>Latest rent payments received</CardDescription>
							</div>
							<Button variant="outline">
								<ClipboardList className="mr-2 h-4 w-4" />
								<span className="md:hidden lg:block">Financial Reports</span>
							</Button>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{recentPayments.map((payment) => (
									<li
										key={payment.id}
										className="flex justify-between items-center"
									>
										<span>{payment.tenant}</span>
										<span className="font-semibold">${payment.amount}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>Pending Maintenance</CardTitle>
								<CardDescription>Issues reported by tenants</CardDescription>
							</div>
							<Button variant="outline">
								<Wrench className="mr-2 h-4 w-4" />{" "}
								<span className="md:hidden lg:block">All Requests</span>
							</Button>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{maintenanceRequests.map((request) => (
									<li
										key={request.id}
										className="flex justify-between items-center"
									>
										<span>
											{request.property}: {request.issue}
										</span>
										<span className="text-sm text-muted-foreground">
											{request.status}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					<Card className="lg:col-span-2">
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>Upcoming Lease Expirations</CardTitle>
								<CardDescription>
									Leases ending in the next 30 days
								</CardDescription>
							</div>
							<Button variant="outline">
								<Calendar className="mr-2 h-4 w-4" />{" "}
								<span className="md:hidden lg:block">Lease Calendar</span>
							</Button>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{upcomingExpirations.map((expiration) => (
									<li
										key={expiration.id}
										className="flex justify-between items-center"
									>
										<span>
											{expiration.tenant} - {expiration.property}
										</span>
										<span className="font-semibold">
											{expiration.expirationDate}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<Button variant="outline">
								<User className="mr-2 h-4 w-4" /> Manage Tenants
							</Button>
							<Button variant="outline">
								<Wrench className="mr-2 h-4 w-4" /> Maintenance Requests
							</Button>
							<Button variant="outline">
								<Calendar className="mr-2 h-4 w-4" /> Lease Calendar
							</Button>
							<Button variant="outline">
								<ClipboardList className="mr-2 h-4 w-4" /> Financial Reports
							</Button>
						</CardContent>
					</Card>
				</div>
			</main>
		</>
	);
}
