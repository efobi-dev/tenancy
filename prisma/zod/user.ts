import * as z from "zod"
import { IDType, Role } from "@prisma/client"
import { CompleteLandlord, relatedLandlordModel, CompleteTenant, relatedTenantModel, CompleteMessage, relatedMessageModel, CompleteSession, relatedSessionModel } from "./index"

export const userModel = z.object({
  id: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  hashedPassword: z.string().nullish(),
  googleId: z.string().nullish(),
  phone: z.string().nullish(),
  avatar: z.string().nullish(),
  customer_code: z.string().nullish(),
  bankName: z.string().nullish(),
  accountNumber: z.string().nullish(),
  accountName: z.string().nullish(),
  bvnNumber: z.string().nullish(),
  idType: z.nativeEnum(IDType).nullish(),
  idNumber: z.string().nullish(),
  isVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.nativeEnum(Role),
  landlordId: z.string().nullish(),
  tenantId: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userModel> {
  landlord?: CompleteLandlord | null
  tenant?: CompleteTenant | null
  sentMessages: CompleteMessage[]
  receivedMessages: CompleteMessage[]
  Session: CompleteSession[]
}

/**
 * relatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => userModel.extend({
  landlord: relatedLandlordModel.nullish(),
  tenant: relatedTenantModel.nullish(),
  sentMessages: relatedMessageModel.array(),
  receivedMessages: relatedMessageModel.array(),
  Session: relatedSessionModel.array(),
}))
