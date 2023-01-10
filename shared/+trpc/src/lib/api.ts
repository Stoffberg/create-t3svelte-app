import type { AppRouter } from '$lib/server/api/root';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';

import superjson from 'superjson';

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

// Import this to use the api on the frontend
export const api = (init?: TRPCClientInit) => {
	if (typeof window === 'undefined')
		return createTRPCClient<AppRouter>({ init, transformer: superjson });
	if (!browserClient) browserClient = createTRPCClient<AppRouter>({ transformer: superjson });
	return browserClient;
};
