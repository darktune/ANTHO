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

  // Create Products
  const products = [
    {
      name: 'Lagos Nights Silk Shirt',
      slug: 'lagos-nights-silk-shirt',
      description: 'Premium silk shirt featuring a relaxed fit, custom horn buttons, and subtle tonal embroidery on the chest pocket. Perfect for evening wear.',
      price: 4500000, // ₦45,000.00
      images: ['/images/antho-shoot/IMG_3806.JPG', '/images/antho-shoot/Snapchat-1522984318.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'lagos-nights')?.id,
      variants: [
        { name: 'Size', value: 'S', stock: 10 },
        { name: 'Size', value: 'M', stock: 15 },
        { name: 'Size', value: 'L', stock: 12 },
        { name: 'Color', value: 'Midnight Black', stock: 20 },
        { name: 'Color', value: 'Champagne', stock: 17 },
      ]
    },
    {
      name: 'Harmattan Heavyweight Hoodie',
      slug: 'harmattan-heavyweight-hoodie',
      description: 'Ultra-heavyweight 500gsm cotton fleece hoodie. Dropped shoulders, slightly cropped body, and a massive double-lined hood.',
      price: 6500000, // ₦65,000.00
      images: ['/images/antho-shoot/IMG_3807.JPG', '/images/antho-shoot/Snapchat-1782284509.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'essentials')?.id,
      variants: [
        { name: 'Size', value: 'M', stock: 8 },
        { name: 'Size', value: 'L', stock: 14 },
        { name: 'Size', value: 'XL', stock: 5 },
        { name: 'Color', value: 'Stone', stock: 15 },
        { name: 'Color', value: 'Washed Black', stock: 12 },
      ]
    },
    {
      name: 'Victoria Island Tailored Trousers',
      slug: 'vi-tailored-trousers',
      description: 'Wide-leg tailored trousers made from a premium wool-blend. Features double pleats, side adjusters, and a slight break at the hem.',
      price: 5500000,
      images: ['/images/antho-shoot/IMG_3801.JPG', '/images/antho-shoot/Snapchat-396574672.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'new-arrivals')?.id,
      variants: [
        { name: 'Size', value: '30', stock: 5 },
        { name: 'Size', value: '32', stock: 10 },
        { name: 'Size', value: '34', stock: 8 },
      ]
    },
    {
      name: 'Eko Essential Tee',
      slug: 'eko-essential-tee',
      description: 'The perfect boxy t-shirt. 280gsm heavyweight cotton, tight collar, and dropped shoulders.',
      price: 2500000,
      images: ['/images/antho-shoot/IMG_3803.JPG', '/images/antho-shoot/Snapchat-617620438.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'essentials')?.id,
      variants: [
        { name: 'Size', value: 'S', stock: 20 },
        { name: 'Size', value: 'M', stock: 30 },
        { name: 'Size', value: 'L', stock: 25 },
        { name: 'Color', value: 'Off-White', stock: 40 },
        { name: 'Color', value: 'Faded Black', stock: 35 },
      ]
    },
    {
      name: 'Adire Camp Collar Shirt',
      slug: 'adire-camp-collar',
      description: 'Modern camp collar shirt featuring custom hand-dyed Adire patterns. Each piece is unique.',
      price: 3500000,
      images: ['/images/antho-shoot/IMG_3804.JPG', '/images/antho-shoot/Snapchat-848713023.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'heritage')?.id,
      variants: [
        { name: 'Size', value: 'M', stock: 5 },
        { name: 'Size', value: 'L', stock: 5 },
      ]
    },
    {
      name: 'Oshodi Cargo Pants',
      slug: 'oshodi-cargo',
      description: 'Technical cargo pants with articulated knees, multiple 3D pockets, and adjustable hems.',
      price: 5000000,
      images: ['/images/antho-shoot/IMG_3805.JPG', '/images/antho-shoot/Snapchat-903653531.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'new-arrivals')?.id,
      variants: [
        { name: 'Size', value: 'S', stock: 10 },
        { name: 'Size', value: 'M', stock: 12 },
        { name: 'Color', value: 'Olive', stock: 15 },
        { name: 'Color', value: 'Black', stock: 7 },
      ]
    },
    {
      name: 'Mainland Denim Jacket',
      slug: 'mainland-denim',
      description: 'Cropped, boxy denim jacket made from 14oz raw selvedge denim. Contrast stitching and custom hardware.',
      price: 7500000,
      images: ['/images/antho-shoot/IMG_3808.JPG', '/images/antho-shoot/photo_1_2026-09-04_09-11-37.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'essentials')?.id,
      variants: [
        { name: 'Size', value: 'M', stock: 8 },
        { name: 'Size', value: 'L', stock: 6 },
      ]
    },
    {
      name: 'Ikoyi Knit Polo',
      slug: 'ikoyi-knit-polo',
      description: 'Textured open-knit polo shirt. Breathable and elegant.',
      price: 3200000,
      images: ['/images/antho-shoot/Snapchat-1079248294.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'lagos-nights')?.id,
      variants: [
        { name: 'Size', value: 'S', stock: 12 },
        { name: 'Size', value: 'M', stock: 15 },
        { name: 'Color', value: 'Cream', stock: 15 },
        { name: 'Color', value: 'Navy', stock: 12 },
      ]
    },
    {
      name: 'Aso-Oke Tote Bag',
      slug: 'aso-oke-tote',
      description: 'Everyday tote bag constructed from traditional Aso-Oke fabric with leather handles.',
      price: 2800000,
      images: ['/images/antho-shoot/Snapchat-1522984318.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'heritage')?.id,
      variants: [
        { name: 'Size', value: 'One Size', stock: 20 },
      ]
    },
    {
      name: 'Gidi Graphic Hoodie',
      slug: 'gidi-graphic-hoodie',
      description: 'Heavyweight hoodie featuring a distressed screenprint inspired by Lagos street art.',
      price: 5500000,
      images: ['/images/antho-shoot/IMG_3806.JPG', '/images/antho-shoot/IMG_3807.JPG'],
      collectionId: createdCollections.find(c => c.slug === 'new-arrivals')?.id,
      variants: [
        { name: 'Size', value: 'L', stock: 10 },
        { name: 'Size', value: 'XL', stock: 8 },
      ]
    },
    {
      name: 'Lekki Linen Shorts',
      slug: 'lekki-linen-shorts',
      description: 'Relaxed linen shorts with an elasticated waistband and internal drawstring.',
      price: 2200000,
      images: ['/images/antho-shoot/Snapchat-1782284509.jpg'],
      collectionId: createdCollections.find(c => c.slug === 'essentials')?.id,
      variants: [
        { name: 'Size', value: 'M', stock: 25 },
        { name: 'Size', value: 'L', stock: 20 },
        { name: 'Color', value: 'Oatmeal', stock: 25 },
        { name: 'Color', value: 'Charcoal', stock: 20 },
      ]
    },
    {
      name: 'Festac Track Jacket',
      slug: 'festac-track-jacket',
      description: 'Retro-inspired track jacket with contrast piping and a two-way zipper.',
      price: 4800000,
      images: ['/images/antho-shoot/IMG_3803.JPG', '/images/antho-shoot/IMG_3804.JPG'],
      collectionId: createdCollections.find(c => c.slug === 'new-arrivals')?.id,
      variants: [
        { name: 'Size', value: 'S', stock: 5 },
        { name: 'Size', value: 'M', stock: 8 },
        { name: 'Size', value: 'L', stock: 6 },
      ]
    }
  ];

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name, category: (p as any).category || "Clothing",
        slug: p.slug,
        description: p.description,
        price: p.price,
        images: { create: p.images.map((url: string, idx: number) => ({ url, alt: p.name, position: idx })) },
        collections: p.collectionId ? { create: { collectionId: p.collectionId } } : undefined,
        isPublished: true,
      },
    });

    // Add variants if created fresh
    const existingVariants = await prisma.productVariant.count({ where: { productId: product.id } });
    if (existingVariants === 0) {
      await Promise.all(
        p.variants.map((v: any) => 
          prisma.productVariant.create({
            data: {
              productId: product.id,
              size: v.name || "M",
              color: v.value || "Black",
              stock: v.stock,
            }
          })
        )
      );
    }
  }
  console.log(`Created ${products.length} products with variants`);

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
