import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4zr5h0mx',
  dataset: 'production',
  apiVersion: '2024-01-31',
  useCdn: false,
});

async function check() {
  const cats = await client.fetch('*[_type == "category"]');
  console.log('--- CATEGORIES ---');
  console.log(`Count: ${cats.length}`);
  cats.forEach(c => console.log(`ID: ${c._id}, Title: ${c.title}, Slug: ${c.slug?.current}`));

  const prods = await client.fetch('*[_type == "product"][0...5]');
  console.log('--- PRODUCTS (First 5) ---');
  prods.forEach(p => console.log(`ID: ${p._id}, Title: ${p.title}, Category Ref: ${p.category?._ref}`));
}

check();
