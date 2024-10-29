import { getAuth } from "@/actions/auth";
import { NavSidebar } from "@/components/nav-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { tenantRoutes } from "@/lib/constants";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function LandlordLayout({
	children,
}: { children: ReactNode }) {
	const { user } = await getAuth();
	if (!user?.isVerified) redirect("/verify");
	if (user?.role !== "ADMIN" && user?.role !== "TENANT") {
		redirect("/landlord");
	}
	return (
		<SidebarProvider>
			<NavSidebar routes={tenantRoutes} />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
