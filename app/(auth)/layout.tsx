import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: {
		template: "%s | Authentication",
		default: "Authentication",
	},
	description: "Log in or sign up to access protected content",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<main className="flex h-screen w-full items-center justify-center px-4">
			{children}
		</main>
	);
}
