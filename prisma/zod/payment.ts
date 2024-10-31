import { PaymentStatus, PaymentType } from "@prisma/client";
import * as z from "zod";
import { type CompleteLease, relatedLeaseModel } from "./index";

export const paymentModel = z.object({
	id: z.string(),
	leaseId: z.string(),
	amount: z.number(),
	paymentDate: z.date(),
	dueDate: z.date(),
	status: z.nativeEnum(PaymentStatus),
	paymentType: z.nativeEnum(PaymentType),
	reference: z.string().nullish(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface CompletePayment extends z.infer<typeof paymentModel> {
	lease: CompleteLease;
}

/**
 * relatedPaymentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPaymentModel: z.ZodSchema<CompletePayment> = z.lazy(() =>
	paymentModel.extend({
		lease: relatedLeaseModel,
	}),
);
