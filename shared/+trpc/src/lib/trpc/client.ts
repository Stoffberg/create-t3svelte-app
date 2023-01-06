import type { AppRouter } from "$lib/trpc/routes";
import { createTRPCClient, type TRPCClientInit } from "trpc-sveltekit";
import superjson from "superjson";

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export const trpc = (init?: TRPCClientInit) => {
  if (typeof window === "undefined") return createTRPCClient<AppRouter>({ init, transformer: superjson });
  if (!browserClient) browserClient = createTRPCClient<AppRouter>({ transformer: superjson });
  return browserClient;
};
