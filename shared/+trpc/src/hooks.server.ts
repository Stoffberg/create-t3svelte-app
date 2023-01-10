import type { Handle } from "@sveltejs/kit";

// Imports for tRPC just trpc
import { createContext } from "$lib/server/api/context";
import { appRouter } from "$lib/server/api/root";
import { createTRPCHandle } from "trpc-sveltekit";

export const handle: Handle = createTRPCHandle({ router: appRouter, createContext });
