import * as z from "zod";
import {
	type CompleteLease,
	type CompleteMaintenanceJob,
	type CompleteProperty,
	type CompleteUnit,
	relatedLeaseModel,
	relatedMaintenanceJobModel,
	relatedPropertyModel,
	relatedUnitModel,
} from "./index";

export const imageModel = z.object({
	id: z.string(),
	url: z.string(),
	caption: z.string().nullish(),
	propertyId: z.string().nullish(),
	unitId: z.string().nullish(),
	leaseId: z.string().nullish(),
	maintenanceJobId: z.string().nullish(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface CompleteImage extends z.infer<typeof imageModel> {
	property?: CompleteProperty | null;
	unit?: CompleteUnit | null;
	lease?: CompleteLease | null;
	maintenanceJob?: CompleteMaintenanceJob | null;
}

/**
 * relatedImageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedImageModel: z.ZodSchema<CompleteImage> = z.lazy(() =>
	imageModel.extend({
		property: relatedPropertyModel.nullish(),
		unit: relatedUnitModel.nullish(),
		lease: relatedLeaseModel.nullish(),
		maintenanceJob: relatedMaintenanceJobModel.nullish(),
	}),
);
