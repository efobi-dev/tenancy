"use client";

import { signUp } from "@/actions/auth";
import Google from "@/assets/icons/google";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema } from "@/lib/constants";
import type { SignUp } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
	const [pending, startTransition] = useTransition();
	const [role, setRole] = useState<"LANDLORD" | "TENANT">("TENANT");
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<SignUp>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			role: role,
		},
	});
	const submit = (values: SignUp) => {
		startTransition(async () => {
			try {
				const { error } = await signUp(values);
				if (error) {
					toast({
						title: "Log in failed",
						description: error,
						variant: "destructive",
					});

					return;
				}
				role === "LANDLORD" ? router.push("/landlord") : router.push("/tenant");
			} catch (error) {
				console.error(error);
				toast({
					title: "Log in failed",
					description: "Internal server error",
					variant: "destructive",
				});
			}
		});
	};
	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Sign up</CardTitle>
				<CardDescription>Welcome to Tenancy</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
						<div className="flex items-center gap-2 justify-between">
							<FormField
								name="first_name"
								control={form.control}
								label="First name"
								className="grid gap-2"
								render={({ field }) => (
									<Input autoComplete="given-name" {...field} />
								)}
							/>
							<FormField
								name="last_name"
								control={form.control}
								label="Last name"
								className="grid gap-2"
								render={({ field }) => (
									<Input autoComplete="family-name" {...field} />
								)}
							/>
						</div>
						<FormField
							name="email"
							control={form.control}
							label="Email address"
							className="grid gap-2"
							render={({ field }) => (
								<Input type="email" autoComplete="email" {...field} />
							)}
						/>
						<FormField
							name="password"
							control={form.control}
							label="Password"
							className="grid gap-2"
							render={({ field }) => (
								<Input type="password" autoComplete="new-password" {...field} />
							)}
						/>
						<Button type="submit" className="w-full" disabled={pending}>
							{pending ? (
								<Loader className="animate-spin w-4 h-4" />
							) : (
								"Sign up"
							)}
						</Button>
					</form>
				</Form>
				{role === "TENANT" ? (
					<Button
						variant={"ghost"}
						className="w-full"
						onClick={() => {
							setRole("LANDLORD");
							form.setValue("role", "LANDLORD");
						}}
					>
						Sign up as a landlord
					</Button>
				) : (
					<Button
						variant={"ghost"}
						className="w-full"
						onClick={() => {
							setRole("TENANT");
							form.setValue("role", "TENANT");
						}}
					>
						Sign up as a tenant
					</Button>
				)}
				{role === "TENANT" && (
					<Button variant={"outline"} className="w-full" disabled={pending}>
						<Link href={"/login/google"} className="flex items-center">
							{pending ? (
								<Loader className="animate-spin w-4 h-4" />
							) : (
								<Google className="w-4 h-4 mr-2" />
							)}{" "}
							Login with Google
						</Link>
					</Button>
				)}
				<div className="mt-4 text-center text-sm">
					<Link href="/login" className="underline">
						Log in
					</Link>{" "}
					to your account.
				</div>
			</CardContent>
		</Card>
	);
}
