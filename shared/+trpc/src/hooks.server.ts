import type { Handle } from "@sveltejs/kit";

import { createContext } from "$lib/trpc/context";
import { appRouter } from "$lib/trpc/routes";
import { createTRPCHandle } from "trpc-sveltekit";

export const handle: Handle = createTRPCHandle({ router: appRouter, createContext });
