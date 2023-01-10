import { authMiddleware, type Context } from "$lib/server/api/context";

import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(authMiddleware);
