import { client } from '@/lib/sanity'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60

async function getNewArrivals() {
  return await client.fetch(`*[_type == "product" && isNew == true]{
      _id,
      title,
      slug,
      price,
      images,
      badges,
      isNew,
      category->{title, slug}
  }`)
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="flex items-center justify-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">New Arrivals</h1>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">LATEST</span>
        </div>
        
        {products.length > 0 ? (
            <ProductGrid products={products} title="" />
        ) : (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">New collections are arriving soon. Stay tuned!</p>
            </div>
        )}
      </div>
    </div>
  )
}
