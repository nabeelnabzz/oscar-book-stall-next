import ProductCard from './ProductCard'

export default function ProductGrid({ products = [], title }) {
  if (!products.length) return null

  return (
    <section className="py-12">
      <div className="container">
       {title && <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
         </div>
      </div>
    </section>
  )
}
