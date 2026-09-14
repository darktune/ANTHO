import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@antho.ng';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Antho Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Admin created: ${admin.email}`);

  // Create Collections
  const collections = [
    { name: 'The Premier Launch', slug: 'the-premier-launch', description: 'The definitive 4-piece launch capsule engineered for youth and young adult streetwear connoisseurs.' },
    { name: 'Global Prevails', slug: 'global-prevails', description: 'Iconic high-density graphic tees honoring cultural resilience and contemporary youth expression.' },
    { name: 'NPNG & Architectural Fleece', slug: 'npng-fleece', description: 'Milled French terry sweatpants and boxy pique polo shirts designed with intentional stacked drape.' },
    { name: 'Lagos Archival Syndicate', slug: 'lagos-archival', description: 'Documented streetwear drops and campaign silhouettes from our Covenant University tradefair pop-up series.' },
  ];

  const createdCollections = await Promise.all(
    collections.map(c => 
      prisma.collection.upsert({
        where: { slug: c.slug },
        update: {},
        create: c,
      })
    )
  );
  console.log(`Created ${createdCollections.length} collections`);

  // Clear existing products to ensure clean category mapping
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.collectionProduct.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});

  const { sampleProducts } = await import('../src/lib/sample-data');

  for (const p of sampleProducts) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        category: p.category,
        materials: p.materials,
        careInstructions: p.careInstructions,
        isPublished: true,
        isFeatured: p.isFeatured,
        isBestSeller: p.isBestSeller,
        images: {
          create: p.images.map((img, idx) => ({
            url: img.url,
            alt: img.alt,
            position: idx,
          }))
        },
        variants: {
          create: p.variants.map(v => ({
            size: v.size,
            color: v.color,
            colorHex: v.colorHex || '#000000',
            stock: v.stock,
          }))
        }
      }
    });
  }
  console.log(`Created ${sampleProducts.length} products with categories: Classic ANTHO Polos, ANTHO Sweatpants, ANTHO Graphic Tees`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
