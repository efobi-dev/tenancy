import { getAuth } from "@/actions/auth";
import { LogoHead } from "./logo-head";
import { NavRoutes } from "./nav-routes";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "./ui/sidebar";

export async function NavSidebar({
	routes,
	...props
}: {
	routes: {
		name: string;
		url: string;
		icon: string;
	}[];
} & React.ComponentProps<typeof Sidebar>) {
	const { user } = await getAuth();
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<LogoHead role={user?.role} />
			</SidebarHeader>
			<SidebarContent>
				<NavRoutes links={routes} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					name={user?.first_name}
					email={user?.email}
					avatar={user?.avatar}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
