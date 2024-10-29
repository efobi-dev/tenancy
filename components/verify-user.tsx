"use client";

import { Form, FormField } from "./ui/form";
import { useDebounce } from "use-debounce";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { verifyUserSchema, type VerifyUser, type Bank } from "@/lib/constants";
import { useTransition, useState } from "react";
import { Loader } from "lucide-react";
import { getBank, verifyUser } from "@/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export function Verification({
	first_name,
	last_name,
	role,
}: {
	first_name: string;
	last_name: string;
	role: "TENANT" | "LANDLORD" | "ADMIN";
}) {
	const [banks, setBanks] = useState<Bank[] | undefined>(undefined);
	const [searchBank, setSearchBank] = useState("");
	const router = useRouter();
	const { toast } = useToast();
	const [pending, startTransition] = useTransition();
	const form = useForm<VerifyUser>({
		resolver: zodResolver(verifyUserSchema),
		defaultValues: {
			bvnNumber: "",
			bankCode: "",
			accountNumber: "",
		},
	});

	const [debouncedCallback] = useDebounce(async (value: string) => {
		if (!value) return;
		const { error, data } = await getBank(value);
		if (error) {
			toast({
				title: "Failed to get bank",
				description: error,
				variant: "destructive",
			});
			return;
		}
		setBanks(data);
	}, 300);

	const submit = (values: VerifyUser) => {
		startTransition(async () => {
			try {
				const { error, message } = await verifyUser(values);
				if (error) {
					toast({
						title: "Verification failed",
						description: error,
						variant: "destructive",
					});
					return;
				}
				toast({
					title: "Verification successful",
					description: message,
				});
				role === "LANDLORD" ? router.push("/landlord") : router.push("/tenant");
			} catch (error) {
				console.error(error);
				toast({
					title: "Verification failed",
					description: "Something went wrong, please try again",
					variant: "destructive",
				});
			}
		});
	};

	return (
		<Card>
			<CardHeader className="text-2xl">
				<CardTitle>Verify account</CardTitle>
				<CardDescription>Verify your account to continue</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="flex items-center gap-2 justify-between">
					<Input placeholder={first_name} disabled />
					<Input placeholder={last_name} disabled />
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
						<FormField
							name="bvnNumber"
							control={form.control}
							className="grid gap-2"
							label="Bank verification number"
							render={({ field }) => <Input {...field} />}
						/>
						<FormField
							name="accountNumber"
							control={form.control}
							className="grid gap-2"
							label="Bank account number"
							render={({ field }) => <Input {...field} />}
						/>
						<Input
							placeholder="Search banks"
							value={searchBank}
							onChange={(e) => {
								setSearchBank(e.target.value);
								debouncedCallback(e.target.value);
							}}
						/>
						{banks && (
							<FormField
								name="bankCode"
								control={form.control}
								render={({ field }) => (
									<Select onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Select bank" />
										</SelectTrigger>
										<SelectContent>
											{banks.map((bank) => (
												<SelectItem key={bank.id} value={bank.code}>
													{bank.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						)}
						<Button type="submit" className="w-full">
							{pending ? <Loader className="w-4 h-4 animate-spin" /> : "Submit"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
