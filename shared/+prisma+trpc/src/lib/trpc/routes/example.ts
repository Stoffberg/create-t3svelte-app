import { z } from "zod";
import { router, publicProcedure } from "$lib/trpc/router";

export const exampleRouter = router({
  hello: publicProcedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ input }) => {
    return `Hello ${input?.text ?? "from tRPC"}`;
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
