import { PrismaClient } from "@prisma/client";
import { data } from "./data";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clear existing data
  await prisma.feature.deleteMany();
  await prisma.product.deleteMany();

  console.log("Deleted existing data");

  for (const product of data) {
    console.log(`Creating product: ${product.name}`);
    try {
      await prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          logoUrl: product.logoUrl ?? null,
          stackfixScore: product.productScoring.stackfixScore,
          feature: {
            create: product.requirements.map((req) => ({
              name: req.name,
              status: req.status,
            })),
          },
        },
      });
    } catch (error) {
      console.error(`Failed to create product ${product.name}:`, error);
      throw error;
    }
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
