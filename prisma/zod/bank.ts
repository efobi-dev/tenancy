import * as z from "zod";

export const bankModel = z.object({
	id: z.number().int(),
	name: z.string(),
	code: z.string(),
	longcode: z.string(),
});
