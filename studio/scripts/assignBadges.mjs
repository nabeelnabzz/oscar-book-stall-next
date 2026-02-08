import { createClient } from '@sanity/client';
import { nanoid } from 'nanoid';

const client = createClient({
  projectId: '4zr5h0mx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-31',
  token: process.env.SANITY_API_TOKEN // Note: This might need a token if it's a mutation
});

async function assignBadges() {
    console.log('Fetching products...');
    const products = await client.fetch('*[_type == "product"]');
    console.log(`Found ${products.length} products.`);

    const badges = ['New', 'Offer', 'Popular', 'Best Seller'];

    for (const product of products) {
        const randomBadges = [];
        // 30% chance of being New
        if (Math.random() > 0.7) randomBadges.push('New');
        // 30% chance of being Offer (if not already discounted)
        if (Math.random() > 0.7 || product.discountedPrice) randomBadges.push('Offer');
        // 20% chance of being Popular or Best Seller
        if (Math.random() > 0.8) randomBadges.push(Math.random() > 0.5 ? 'Popular' : 'Best Seller');

        const isNew = randomBadges.includes('New');

        console.log(`Updating ${product.title} with badges: ${randomBadges.join(', ')}`);
        
        await client
            .patch(product._id)
            .set({ 
                badges: randomBadges,
                isNew: isNew
            })
            .commit();
    }
    console.log('Successfully updated all products!');
}

// Since I don't have a token easily available in this environment, I'll use the CLI 'exec' approach
// Wait, I can just use 'sanity documents' or 'sanity exec'
assignBadges().catch(console.error);
