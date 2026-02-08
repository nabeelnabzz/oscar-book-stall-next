import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Configuration from src/lib/sanity.js
const client = createClient({
  projectId: '4zr5h0mx',
  dataset: 'production',
  apiVersion: '2024-01-31',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Requires token if run with node, or none if with sanity exec
})

const IMAGES = {
  banner: 'C:/Users/nabee/.gemini/antigravity/brain/d2a96d2f-2b94-4d60-bc0e-98fedd81c1a0/stationery_banner_premium_1769963481422.png',
  pens: 'C:/Users/nabee/.gemini/antigravity/brain/d2a96d2f-2b94-4d60-bc0e-98fedd81c1a0/pens_category_image_1769963498360.png',
  notebooks: 'C:/Users/nabee/.gemini/antigravity/brain/d2a96d2f-2b94-4d60-bc0e-98fedd81c1a0/notebooks_category_image_1769963514330.png'
}

async function uploadImage(filePath) {
  console.log(`Uploading ${filePath}...`)
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath)
  })
  return asset
}

async function seed() {
  try {
    // 1. Upload Assets
    const bannerAsset = await uploadImage(IMAGES.banner)
    const pensAsset = await uploadImage(IMAGES.pens)
    const notebooksAsset = await uploadImage(IMAGES.notebooks)

    // 2. Update/Create Categories
    console.log('Seeding Categories...')
    await client.createOrReplace({
      _id: 'cat-pens',
      _type: 'category',
      title: 'Pens',
      slug: { current: 'pens' },
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: bannerAsset._id } // Using banner as pen placeholder if needed, but wait I have pens image
      }
    })
    
    // Actually use the correct ones
    await client.patch('cat-pens')
      .set({
        image: { _type: 'image', asset: { _type: 'reference', _ref: pensAsset._id } }
      })
      .commit()

    await client.createOrReplace({
      _id: 'cat-notebooks',
      _type: 'category',
      title: 'Notebooks',
      slug: { current: 'notebooks' },
      image: { _type: 'image', asset: { _type: 'reference', _ref: notebooksAsset._id } }
    })

    // 3. Create Banner
    console.log('Seeding Banner...')
    await client.create({
      _type: 'banner',
      title: 'Premium Stationery for Every Need',
      subtitle: 'Explore our curated collection of pens, journals, and tools.',
      image: { _type: 'image', asset: { _type: 'reference', _ref: bannerAsset._id } },
      layout: 'center',
      textColor: 'text-white',
      overlayOpacity: 30,
      buttonText: 'Explore Catalog',
      link: '/products'
    })

    console.log('Successfully seeded images and documents!')
  } catch (err) {
    console.error('Seed error:', err)
  }
}

seed()
