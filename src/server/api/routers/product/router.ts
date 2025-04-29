import { createTRPCRouter, publicProcedure } from "../../trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(
    async ({ ctx }) => await ctx.prisma.product.findMany(),
  ),
});
