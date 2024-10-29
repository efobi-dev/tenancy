import * as z from "zod"
import { PropertyType } from "@prisma/client"
import { CompleteLandlord, relatedLandlordModel, CompleteUnit, relatedUnitModel, CompleteImage, relatedImageModel } from "./index"

export const propertyModel = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  type: z.nativeEnum(PropertyType),
  description: z.string().nullish(),
  landlordId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteProperty extends z.infer<typeof propertyModel> {
  landlord: CompleteLandlord
  units: CompleteUnit[]
  images: CompleteImage[]
}

/**
 * relatedPropertyModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPropertyModel: z.ZodSchema<CompleteProperty> = z.lazy(() => propertyModel.extend({
  landlord: relatedLandlordModel,
  units: relatedUnitModel.array(),
  images: relatedImageModel.array(),
}))
