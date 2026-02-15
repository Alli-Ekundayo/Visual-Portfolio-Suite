import { z } from "zod";
import { insertMessageSchema, messages } from "./schema";

export const api = {
  messages: {
    create: {
      method: "POST" as const,
      path: "/api/messages" as const,
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
