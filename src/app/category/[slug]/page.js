import { client } from '@/lib/sanity'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'

export const revalidate = 60

async function getCategory(slug) {
  return await client.fetch(`*[_type == "category" && slug.current == $slug][0]{
      _id,
      title,
      slug
  }`, { slug })
}

async function getProductsByCategory(slug) {
  return await client.fetch(`*[_type == "product" && category->slug.current == $slug]{
      _id,
      title,
      slug,
      price,
      discountedPrice,
      images,
      badges,
      isNew,
      category->{title, slug}
  }`, { slug })
}

async function getSettings() {
    return await client.fetch(`*[_type == "siteSettings"][0]{contactNumber}`)
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const [category, products, settings] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
    getSettings()
  ])

  if (!category) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-400">Category Not Found</h1>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{category.title}</span>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-[#0f4c81]">{category.title}</h1>
        <p className="text-gray-500 mb-8">Browse our collection of {category.title}</p>
        
        {products.length > 0 ? (
            <ProductGrid products={products} title="" settings={settings} />
        ) : (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
        )}
      </div>
    </div>
  )
}
