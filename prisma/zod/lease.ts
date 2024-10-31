import { LeaseStatus } from "@prisma/client";
import * as z from "zod";
import {
	type CompleteDocument,
	type CompleteImage,
	type CompletePayment,
	type CompleteTenant,
	type CompleteUnit,
	relatedDocumentModel,
	relatedImageModel,
	relatedPaymentModel,
	relatedTenantModel,
	relatedUnitModel,
} from "./index";

export const leaseModel = z.object({
	id: z.string(),
	unitId: z.string(),
	tenantId: z.string(),
	startDate: z.date(),
	endDate: z.date(),
	rentAmount: z.number(),
	securityDeposit: z.number(),
	status: z.nativeEnum(LeaseStatus),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface CompleteLease extends z.infer<typeof leaseModel> {
	unit: CompleteUnit;
	tenant: CompleteTenant;
	rentPayments: CompletePayment[];
	documents: CompleteDocument[];
	images: CompleteImage[];
}

/**
 * relatedLeaseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedLeaseModel: z.ZodSchema<CompleteLease> = z.lazy(() =>
	leaseModel.extend({
		unit: relatedUnitModel,
		tenant: relatedTenantModel,
		rentPayments: relatedPaymentModel.array(),
		documents: relatedDocumentModel.array(),
		images: relatedImageModel.array(),
	}),
);
