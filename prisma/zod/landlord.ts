import * as z from "zod"
import { CompleteProperty, relatedPropertyModel, CompleteMaintenanceJob, relatedMaintenanceJobModel, CompleteUser, relatedUserModel } from "./index"

export const landlordModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteLandlord extends z.infer<typeof landlordModel> {
  properties: CompleteProperty[]
  maintenanceJobs: CompleteMaintenanceJob[]
  User: CompleteUser[]
}

/**
 * relatedLandlordModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedLandlordModel: z.ZodSchema<CompleteLandlord> = z.lazy(() => landlordModel.extend({
  properties: relatedPropertyModel.array(),
  maintenanceJobs: relatedMaintenanceJobModel.array(),
  User: relatedUserModel.array(),
}))
