import type { RequestEvent } from "@sveltejs/kit";
import { type inferAsyncReturnType } from "@trpc/server";

import { prisma } from "$lib/server/db";
import { t } from "./trpc";

export const createContext = async (event: RequestEvent) => {
  return {
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
