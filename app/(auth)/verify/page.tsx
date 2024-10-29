import { getAuth } from "@/actions/auth";
import type { Metadata } from "next";
import { Verification } from "@/components/verify-user";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Verification",
	description: "Verify your identity to continue",
};

export default async function Page() {
	const { user } = await getAuth();
	if (!user) redirect("/login");
	return (
		<Verification
			first_name={user?.first_name}
			last_name={user?.last_name}
			role={user?.role}
		/>
	);
}
