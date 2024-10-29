"use client";

import { signIn } from "@/actions/auth";
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
import { signInSchema } from "@/lib/constants";
import type { SignIn } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
	const [pending, startTransition] = useTransition();
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<SignIn>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const submit = (values: SignIn) => {
		startTransition(async () => {
			try {
				const { error } = await signIn(values);
				if (error) {
					toast({
						title: "Log in failed",
						description: error,
						variant: "destructive",
					});

					return;
				}
				router.push("/");
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
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
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
							{pending ? <Loader className="animate-spin w-4 h-4" /> : "Log in"}
						</Button>
					</form>
				</Form>
				<Button variant={"outline"} className="w-full mt-2" disabled={pending}>
					<Link href={"/login/google"} className="flex items-center">
						{pending ? (
							<Loader className="animate-spin w-4 h-4" />
						) : (
							<Google className="w-4 h-4 mr-2" />
						)}{" "}
						Login with Google
					</Link>
				</Button>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
