import { getAuth } from "@/actions/auth";
import { MaintenanceSummary } from "@/components/landlord/maintenance-summary";
import { PaymentSummary } from "@/components/landlord/payment-summary";
import { PropertiesSummary } from "@/components/landlord/prop-summary";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function Page() {
	const { user } = await getAuth();
	if (!user) redirect("/login");
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
			</header>{" "}
			<main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4 pt-0">
				<PropertiesSummary />
				<PaymentSummary user={user} />
				<MaintenanceSummary user={user} />
			</main>
		</>
	);
}
