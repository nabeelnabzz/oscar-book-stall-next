import { getCliClient } from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-31'})

const banners = [
  {
    _type: 'banner',
    _id: 'banner-1',
    title: 'Elevate Your Desk Setup',
    subtitle: 'Premium japanese stationery for the modern creator',
    link: '/category/pens',
    imageUrl: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=2070&auto=format&fit=crop'
  },
  {
    _type: 'banner',
    _id: 'banner-2',
    title: 'The Art of Writing',
    subtitle: 'Discover our exclusive collection of fountain pens',
    link: '/category/pens',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1950&auto=format&fit=crop'
  }
]

const categories = [
  { _type: 'category', _id: 'cat-pens', title: 'Pens', slug: { current: 'pens' } },
  { _type: 'category', _id: 'cat-notebooks', title: 'Notebooks', slug: { current: 'notebooks' } },
  { _type: 'category', _id: 'cat-art', title: 'Art Supplies', slug: { current: 'art-supplies' } },
  { _type: 'category', _id: 'cat-office', title: 'Office Supplies', slug: { current: 'office-supplies' } },
]

const products = [
  {
    _type: 'product',
    _id: 'prod-lamy-safari',
    title: 'Lamy Safari Fountain Pen - Charcoal',
    slug: { current: 'lamy-safari-charcoal' },
    price: 2600,
    description: [{_type: 'block', children: [{_type: 'span', text: 'Timeless design, perfect ergonomics.'}]}],
    categoryId: 'cat-pens',
    imageUrl: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600&auto=format&fit=crop'
  },
  {
    _type: 'product',
    _id: 'prod-moleskine',
    title: 'Classic Notebook - Hard Cover',
    slug: { current: 'classic-notebook' },
    price: 1800,
    description: [{_type: 'block', children: [{_type: 'span', text: 'The legendary notebook of Hemingway, Picasso, and Chatwin.'}]}],
    categoryId: 'cat-notebooks',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
  },
  {
    _type: 'product',
    _id: 'prod-markers',
    title: 'Professional Brush Markers Set',
    slug: { current: 'brush-markers-set' },
    price: 1200,
    discountedPrice: 999,
    description: [{_type: 'block', children: [{_type: 'span', text: 'Vibrant colors for your best artwork.'}]}],
    categoryId: 'cat-art',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'
  },
  {
    _type: 'product',
    _id: 'prod-organizer',
    title: 'Desk Organizer Mesh',
    slug: { current: 'desk-organizer' },
    price: 850,
    description: [{_type: 'block', children: [{_type: 'span', text: 'Keep your workspace tidy.'}]}],
    categoryId: 'cat-office',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd45eeed6b3?q=80&w=600&auto=format&fit=crop'
  }
]

async function uploadImage(url) {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  return client.assets.upload('image', Buffer.from(buffer))
}

async function seed() {
  console.log('Seeding Categories...')
  for (const cat of categories) {
    await client.createOrReplace(cat)
  }

  console.log('Seeding Banners...')
  for (const banner of banners) {
    const imageAsset = await uploadImage(banner.imageUrl)
    await client.createOrReplace({
      ...banner,
      image: { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }
    })
  }

  console.log('Seeding Products...')
  for (const prod of products) {
    const imageAsset = await uploadImage(prod.imageUrl)
    const { categoryId, imageUrl, ...productData } = prod
    await client.createOrReplace({
      ...productData,
      category: { _type: 'reference', _ref: categoryId },
      images: [{ _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }]
    })
  }
  
  console.log('Done!')
}

seed().catch(console.error)
