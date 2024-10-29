import { getAuth } from "@/actions/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: {
		template: "%s | Admin",
		default: "Admin",
	},
	description: "Admin dashboard",
};

export default async function AdminLayout({
	children,
}: { children: ReactNode }) {
	const { user } = await getAuth();
	if (user?.role !== "ADMIN") redirect("/");
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
