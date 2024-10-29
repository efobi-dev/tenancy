"use client";

import { signOut } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavUser({
	name,
	email,
	avatar,
}: {
	name: string | undefined;
	email: string | undefined;
	avatar: string | null | undefined;
}) {
	const { isMobile } = useSidebar();
	const { toast } = useToast();
	const router = useRouter();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={avatar ?? ""} alt={name} />
								<AvatarFallback className="rounded-lg">
									{name?.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{name}</span>
								<span className="truncate text-xs">{email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={avatar ?? ""} alt={name} />
									<AvatarFallback className="rounded-lg">
										{name?.substring(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{name}</span>
									<span className="truncate text-xs">{email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => router.push("/settings")}>
								<BadgeCheck />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => router.push("/notifications")}>
								<Bell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={async () => {
								try {
									const { error, redirectTo } = await signOut();
									if (error) {
										toast({
											title: "Failed to sign out",
											description: error,
											variant: "destructive",
										});
										return;
									}
									redirectTo && router.push(redirectTo);
								} catch (error) {
									console.error(error);
									toast({
										title: "Failed to sign out",
										description: "Internal server error",
										variant: "destructive",
									});
								}
							}}
						>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
