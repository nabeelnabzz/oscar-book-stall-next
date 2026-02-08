import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Configuration
const projectId = '4zr5h0mx'
const dataset = 'production'
const token = 'skeyH...YOUR_TOKEN_HERE_OR_LOGGED_IN_CLIENT' // We will assume we need a token or we use local authenticated session if possible. 
// Actually, writing with client requires a token.
// Since I don't have the user's token, I cannot WRITE to their production dataset easily from a script without them creating a token.
// HOWEVER, I can try to use the `sanity` CLI to import a dataset, or ask the user to create a token.
// BETTER APPROACH: Use `sanity exec`? No, `sanity` CLI can import.
// Let's create an NDJSON file and use `sanity dataset import`.

// Wait, I can't generate the NDJSON easily without images.
// Let's try to make a script that uses the CLI context?
// "npx sanity exec scripts/seed.js --with-user-token" might work.

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-31',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Needed for write
})

const categories = [
  { _id: 'cat-pens', _type: 'category', title: 'Pens', slug: { current: 'pens' } },
  { _id: 'cat-notebooks', _type: 'category', title: 'Notebooks', slug: { current: 'notebooks' } },
  { _id: 'cat-art', _type: 'category', title: 'Art Supplies', slug: { current: 'art-supplies' } },
  { _id: 'cat-office', _type: 'category', title: 'Office Supplies', slug: { current: 'office-supplies' } },
]

const banners = [
  { 
    _type: 'banner', 
    title: 'Back to School', 
    subtitle: 'Get all your essentials', 
    link: '/category/stationery',
    // We can't easily upload images in a script without fetch. 
    // I will skip image assets for now or use placeholders? 
    // The user wants "banner image".
    // I will try to use public URLs for images and let Sanity upload them?
    // Sanity client can upload assets from URL.
  }
]

// To really help the user, I should probably just give them the code and ask them to run it, 
// OR I construct a `sanity exec` script which leverages their local login.

console.log("Seeding data...")
