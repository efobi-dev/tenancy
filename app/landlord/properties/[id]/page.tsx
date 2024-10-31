import { PropImages } from "@/components/landlord/prop-carousel";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import prisma from "@/lib/db";
import { Edit } from "lucide-react";

export default async function Page({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const property = await prisma.property.findUnique({
		where: { id },
		include: {
			images: true,
			landlord: {
				include: {
					maintenanceJobs: {
						include: {
							tenant: true,
						},
					},
				},
			},
			units: {
				include: {
					leases: true,
				},
			},
		},
	});
	return (
		<>
			<header className="sticky top-0 backdrop-blur-sm flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/landlord/properties">
									Properties
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>{property?.name}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex-1" />
				<Button variant="outline" className="mr-4">
					<Edit className="mr-2 h-4 w-4" /> Edit Property
				</Button>
			</header>
			<main className="grid gap-6 md:grid-cols-3 p-4 pt-0">
				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Property overview</CardTitle>
					</CardHeader>
					<CardContent>
						<PropImages images={property?.images} />
					</CardContent>
				</Card>
			</main>
		</>
	);
}
