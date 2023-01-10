import type { RequestEvent } from "@sveltejs/kit";
import { TRPCError, type inferAsyncReturnType } from "@trpc/server";

import { prisma } from "$lib/server/db";
import { t } from "./trpc";

export const createContext = async (event: RequestEvent) => {
  return {
    prisma,
    session: await event.locals.getSession(),
  };
};

export const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export type Context = inferAsyncReturnType<typeof createContext>;
