import * as z from "zod";
import { type CompleteUser, relatedUserModel } from "./index";

export const messageModel = z.object({
	id: z.string(),
	senderId: z.string(),
	receiverId: z.string(),
	content: z.string(),
	read: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface CompleteMessage extends z.infer<typeof messageModel> {
	sender: CompleteUser;
	receiver: CompleteUser;
}

/**
 * relatedMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMessageModel: z.ZodSchema<CompleteMessage> = z.lazy(() =>
	messageModel.extend({
		sender: relatedUserModel,
		receiver: relatedUserModel,
	}),
);
