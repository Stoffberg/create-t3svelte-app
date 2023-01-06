import { router } from "$lib/trpc/router";
import { exampleRouter } from "$lib/trpc/routes/example";

export const appRouter = router({
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
