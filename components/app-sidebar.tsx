"use client";

import {
	BookOpen,
	Bot,
	Frame,
	MapIcon,
	PieChart,
	Settings2,
	SquareTerminal,
} from "lucide-react";

import { LogoHead } from "@/components/logo-head";
import { NavMain } from "@/components/nav-main";
import { NavRoutes } from "@/components/nav-routes";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
		},
		{
			title: "Models",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: "Frame",
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: "PieChart",
		},
		{
			name: "Travel",
			url: "#",
			icon: "MapIcon",
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { name, email, avatar } = data.user;
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<LogoHead />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavRoutes links={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser name={name} email={email} picture={avatar} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
