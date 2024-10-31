import type { z } from "zod";
import type { signInSchema, signUpSchema, verifyUserSchema } from "./constants";

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type VerifyUser = z.infer<typeof verifyUserSchema>;

export interface CreateCustomer {
	status: boolean;
	message: string;
	data: {
		email: string;
		integration: number;
		domain: string;
		customer_code: string;
		id: number;
		identified: boolean;
		identifications: null | [];
		createdAt: Date;
		updatedAt: Date;
	};
}

export interface ValidateCustomer {
	status: boolean;
	message: string;
}

export interface GoogleUser {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
	locale: string;
}

export interface GetBanks {
	status: boolean;
	message: string;
	data: {
		name: string;
		slug: string;
		code: string;
		longcode: string;
		gateway: null | unknown;
		pay_with_bank: boolean;
		active: boolean;
		is_deleted: boolean;
		country: string;
		currency: string;
		type: string;
		id: number;
		createdAt: Date;
		updatedAt: Date;
	}[];
	meta: {
		next: string | null;
		previous: string | null;
		perPage: number;
	};
}

export interface VerificationWebhook {
	event: "customeridentification.failed" | "customeridentification.success";
	data: {
		customer_id: string | number;
		customer_code: string;
		email: string;
		identification: {
			country: string;
			type: string;
			bvn?: string;
			account_number?: string;
			bank_code?: string;
			value?: string;
		};
		reason?: string;
	};
}
