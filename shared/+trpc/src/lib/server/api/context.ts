import type { RequestEvent } from "@sveltejs/kit";
import { type inferAsyncReturnType } from "@trpc/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createContext = async (event: RequestEvent) => {
  return {
    // context information
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
