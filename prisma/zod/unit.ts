import * as z from "zod"
import { UnitType, UnitStatus } from "@prisma/client"
import { CompleteProperty, relatedPropertyModel, CompleteLease, relatedLeaseModel, CompleteDocument, relatedDocumentModel, CompleteImage, relatedImageModel } from "./index"

export const unitModel = z.object({
  id: z.string(),
  unitNumber: z.string(),
  propertyId: z.string(),
  type: z.nativeEnum(UnitType),
  rentAmount: z.number(),
  status: z.nativeEnum(UnitStatus),
  features: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUnit extends z.infer<typeof unitModel> {
  property: CompleteProperty
  leases: CompleteLease[]
  documents: CompleteDocument[]
  images: CompleteImage[]
}

/**
 * relatedUnitModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUnitModel: z.ZodSchema<CompleteUnit> = z.lazy(() => unitModel.extend({
  property: relatedPropertyModel,
  leases: relatedLeaseModel.array(),
  documents: relatedDocumentModel.array(),
  images: relatedImageModel.array(),
}))
