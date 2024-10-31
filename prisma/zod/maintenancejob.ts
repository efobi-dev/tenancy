import { MaintenancePriority, MaintenanceStatus } from "@prisma/client";
import * as z from "zod";
import {
	type CompleteImage,
	type CompleteLandlord,
	type CompleteTenant,
	relatedImageModel,
	relatedLandlordModel,
	relatedTenantModel,
} from "./index";

export const maintenanceJobModel = z.object({
	id: z.string(),
	tenantId: z.string(),
	landlordId: z.string(),
	title: z.string(),
	description: z.string(),
	priority: z.nativeEnum(MaintenancePriority),
	status: z.nativeEnum(MaintenanceStatus),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface CompleteMaintenanceJob
	extends z.infer<typeof maintenanceJobModel> {
	tenant: CompleteTenant;
	landlord: CompleteLandlord;
	images: CompleteImage[];
}

/**
 * relatedMaintenanceJobModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMaintenanceJobModel: z.ZodSchema<CompleteMaintenanceJob> =
	z.lazy(() =>
		maintenanceJobModel.extend({
			tenant: relatedTenantModel,
			landlord: relatedLandlordModel,
			images: relatedImageModel.array(),
		}),
	);
