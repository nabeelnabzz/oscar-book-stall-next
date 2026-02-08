import { client } from '@/lib/sanity'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'

export const revalidate = 60

async function getProducts() {
  return await client.fetch(`*[_type == "product"]{
      _id,
      title,
      slug,
      price,
      discountedPrice,
      images,
      badges,
      isNew,
      category->{title, slug}
  }`)
}

async function getCategories() {
    return await client.fetch(`*[_type == "category"]`)
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                    <h3 className="font-bold text-lg mb-4">Categories</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products" className="font-semibold text-[#0f4c81]">All Products</Link></li>
                        {categories.map(cat => (
                            <li key={cat._id}>
                                <Link href={`/category/${cat.slug.current}`} className="text-gray-600 hover:text-[#0f4c81] transition-colors block py-1">
                                    {cat.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="mt-8">
                        <h3 className="font-bold text-lg mb-4">Filters</h3>
                        <label className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                            <input type="checkbox" className="rounded text-[#0f4c81]" /> New Arrivals
                        </label>
                        <label className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                            <input type="checkbox" className="rounded text-[#0f4c81]" /> On Offer
                        </label>
                    </div>
                </div>
            </aside>
            
            {/* Product Grid */}
            <div className="flex-1">
                <ProductGrid products={products} title="" />
            </div>
        </div>
      </div>
    </div>
  )
}
