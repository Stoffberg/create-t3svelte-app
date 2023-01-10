import { router } from '$lib/server/api/trpc';

// Import nested routers
import { exampleRouter } from '$lib/server/api/routers/example';

export const appRouter = router({
	example: exampleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
