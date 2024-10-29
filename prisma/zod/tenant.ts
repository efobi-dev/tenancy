import * as z from "zod"
import { CompleteLease, relatedLeaseModel, CompleteMaintenanceJob, relatedMaintenanceJobModel, CompleteUser, relatedUserModel } from "./index"

export const tenantModel = z.object({
  id: z.string(),
  occupation: z.string().nullish(),
  employer: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteTenant extends z.infer<typeof tenantModel> {
  leases: CompleteLease[]
  maintenanceJobs: CompleteMaintenanceJob[]
  User: CompleteUser[]
}

/**
 * relatedTenantModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTenantModel: z.ZodSchema<CompleteTenant> = z.lazy(() => tenantModel.extend({
  leases: relatedLeaseModel.array(),
  maintenanceJobs: relatedMaintenanceJobModel.array(),
  User: relatedUserModel.array(),
}))
