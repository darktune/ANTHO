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
    { name: 'New Arrivals', slug: 'new-arrivals', description: 'The latest additions to the ANTHO catalog.' },
    { name: 'Essentials', slug: 'essentials', description: 'Core pieces for everyday wear.' },
    { name: 'Lagos Nights', slug: 'lagos-nights', description: 'Premium evening wear inspired by the city that never sleeps.' },
    { name: 'Heritage', slug: 'heritage', description: 'Pieces celebrating Nigerian culture and traditional textiles.' },
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
