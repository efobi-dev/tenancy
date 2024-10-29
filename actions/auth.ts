"use server";

import {
	type SessionValidationResult,
	createSession,
	deleteSessionTokenCookie,
	generateSessionToken,
	invalidateSession,
	setSessionTokenCookie,
	validateSessionToken,
} from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/constants";
import type { CreateCustomer, SignIn, SignUp } from "@/lib/types";
import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { cache } from "react";
import { env } from "@/lib/env";
export async function signUp(values: SignUp) {
	try {
		const { data, error } = await signUpSchema.safeParseAsync(values);
		if (error) return { error: "Invalid body received" };
		const { email, password, first_name, last_name, role } = data;
		const hashedPassword = await new Argon2id().hash(password);
		const user = await prisma.user.create({
			data: {
				email,
				hashedPassword,
				first_name,
				last_name,
				role,
			},
		});
		if (!user) return { error: "Failed to sign up" };
		const response = await fetch("https://api.paystack.co/customer", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.PAYSTACK_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				first_name,
				last_name,
			}),
		});
		const message: CreateCustomer = await response.json();
		if (message.status === false) {
			console.error(message.message);
			return { error: message.message };
		}
		const updateUser = await prisma.user.update({
			where: { id: user.id },
			data: { customer_code: message.data.customer_code },
		});
		if (!updateUser) return { error: "Failed to create customer" };
		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(token, session.expiresAt);
		return { success: true };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}

export async function signIn(values: SignIn) {
	try {
		const { data, error } = await signInSchema.safeParseAsync(values);
		if (error) return { error: "Invalid body received" };
		const { email, password } = data;
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				hashedPassword: true,
			},
		});
		if (!user) return { error: "Incorrect email or password" };
		if (!user.hashedPassword) return { error: "Please sign in with OAuth" };
		const validPassword = await new Argon2id().verify(
			user.hashedPassword,
			password,
		);
		if (!validPassword) return { error: "Incorrect email or password" };
		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(token, session.expiresAt);
		return { success: true };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}
export const getAuth = cache(async (): Promise<SessionValidationResult> => {
	const sessionCookie = (await cookies()).get("session");
	if (!sessionCookie?.value) {
		return { session: null, user: null };
	}
	return await validateSessionToken(sessionCookie.value);
});

export async function signOut() {
	const { session } = await getAuth();
	if (!session) {
		return { success: true, redirectTo: "/login" };
	}
	try {
		await invalidateSession(session.id);
		deleteSessionTokenCookie();
		return { success: true, redirectTo: "/login" };
	} catch (error) {
		console.error(error);
		return { error: "Internal server error" };
	}
}
