"use client";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import * as LucideIcons from "lucide-react";
import { usePathname } from "next/navigation";

export function NavRoutes({
	links,
}: {
	links: {
		name: string;
		url: string;
		icon: string;
	}[];
}) {
	const pathname = usePathname();
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
			<SidebarMenu>
				{links.map((item) => {
					const Icon = LucideIcons[
						item.icon as keyof typeof LucideIcons
					] as LucideIcons.LucideIcon;
					return (
						<SidebarMenuItem key={item.name}>
							<SidebarMenuButton
								asChild
								tooltip={item.name}
								className={
									pathname.startsWith(item.url)
										? "bg-secondary text-secondary-foreground"
										: ""
								}
							>
								<a href={item.url}>
									{Icon && <Icon />}
									<span>{item.name}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
