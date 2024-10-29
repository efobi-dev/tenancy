import * as z from "zod"
import { DocumentType } from "@prisma/client"
import { CompleteUnit, relatedUnitModel, CompleteLease, relatedLeaseModel } from "./index"

export const documentModel = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(DocumentType),
  url: z.string(),
  unitId: z.string().nullish(),
  leaseId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDocument extends z.infer<typeof documentModel> {
  unit?: CompleteUnit | null
  lease?: CompleteLease | null
}

/**
 * relatedDocumentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedDocumentModel: z.ZodSchema<CompleteDocument> = z.lazy(() => documentModel.extend({
  unit: relatedUnitModel.nullish(),
  lease: relatedLeaseModel.nullish(),
}))
