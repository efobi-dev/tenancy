"use server";

import { verifyUserSchema } from "@/lib/constants";
import prisma from "@/lib/db";
import { env } from "@/lib/env";
import type { ValidateCustomer, VerifyUser } from "@/lib/types";
import { getAuth } from "./auth";

export async function getBank(query?: string) {
	try {
		const bank = await prisma.bank.findMany({
			where: {
				name: {
					contains: query,
					mode: "insensitive",
				},
			},
		});
		if (!bank) return { error: "No bank found" };
		return { success: true, data: bank };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}

export async function verifyUser(values: VerifyUser) {
	try {
		const { user } = await getAuth();
		if (!user) return { error: "Unauthorized" };
		const { data, error } = await verifyUserSchema.safeParseAsync(values);
		if (error) return { error: error.errors[0].message };
		const { bvnNumber, accountNumber, bankCode } = data;
		const response = await fetch(
			`https://api.paystack.co/customer/${user.customer_code}/identification`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${env.PAYSTACK_KEY}`,
				},
				body: JSON.stringify({
					country: "NG",
					type: "bank_account",
					account_number: accountNumber,
					bvn: bvnNumber,
					bank_code: bankCode,
					first_name: user.first_name,
					last_name: user.last_name,
				}),
			},
		);
		const paystack: ValidateCustomer = await response.json();
		if (paystack.status === false) return { error: paystack.message };
		await prisma.user.update({
			where: { id: user.id },
			data: {
				isVerified: true,
				accountName: `${user.first_name} ${user.last_name}`,
				accountNumber,
				bvnNumber,
			},
		});
		return { success: true, message: paystack.message };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}

export async function uploadAvatar(file: File) {
	try {
		const { user } = await getAuth();
		if (!user) return { error: "Unauthorized" };
		const baseUrl = `${env.NEXT_PUBLIC_APP_URL}/${user.role === "LANDLORD" ? "landlord" : "tenant"}/settings`;
		const presignedURL = new URL("/api/presigned", baseUrl);
		presignedURL.searchParams.set("fileName", file.name);
		presignedURL.searchParams.set("contentType", file.type);
		const res = await fetch(presignedURL.toString());
		if (!res.ok) {
			console.error(await res.text());
			return { error: "Failed to get presigned url" };
		}
		const { signedUrl } = await res.json();
		const uploadResponse = await fetch(signedUrl, {
			method: "PUT",
			body: file,
			headers: {
				"Content-Type": file.type,
			},
		});
		if (!uploadResponse.ok) {
			console.error(await uploadResponse.text());
			return { error: "Failed to upload file" };
		}
		const userAvatar = await prisma.user.update({
			where: { id: user.id },
			data: {
				avatar: `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${file.name}`,
			},
		});
		if (!userAvatar) return { error: "Failed to update avatar" };
		return { success: true, message: "Avatar updated successfully" };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}
