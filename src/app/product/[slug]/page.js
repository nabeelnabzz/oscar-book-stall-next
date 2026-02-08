import { client, urlFor } from '@/lib/sanity'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

export const revalidate = 60

async function getProduct(slug) {
  return await client.fetch(`*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      price,
      discountedPrice,
      description,
      images,
      badges,
      stock,
      category->{title, slug}
  }`, { slug })
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
      return <div className="p-20 text-center">Product not found.</div>
  }

  const isSale = product.discountedPrice && product.discountedPrice < product.price

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-black">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Section */}
            <div>
                 <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
                     {product.images?.[0] ? (
                        <img 
                            src={urlFor(product.images[0]).width(800).height(1000).url()} 
                            className="w-full h-full object-cover"
                            alt={product.title}
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                     )}
                     
                     {/* Badges Overlay */}
                     <div className="absolute top-4 left-4 flex flex-col gap-2">
                         {product.badges?.map(badge => (
                             <span key={badge} className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded shadow-md uppercase">{badge}</span>
                         ))}
                     </div>
                 </div>
                 {/* Thumbnails (Static for now) */}
                 <div className="flex gap-4 overflow-x-auto pb-2">
                     {product.images?.map((img, idx) => (
                         <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border hover:border-blue-500 cursor-pointer flex-shrink-0">
                             <img src={urlFor(img).width(100).height(100).url()} className="w-full h-full object-cover" />
                         </div>
                     ))}
                 </div>
            </div>

            {/* Details Section */}
            <div>
                <Link href={`/category/${product.category?.slug?.current}`} className="text-[#0f4c81] font-bold text-sm tracking-widest uppercase mb-4 block">
                    {product.category?.title}
                </Link>
                
                <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">{product.title}</h1>
                
                <div className="flex items-end gap-4 mb-6 border-b pb-6">
                    {isSale ? (
                        <>
                            <span className="text-3xl font-bold text-gray-900">₹{product.discountedPrice}</span>
                            <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                                {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                            </span>
                        </>
                    ) : (
                        <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                    )}
                </div>

                <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
                     {/* Simple text or portable text rendering */}
                     <p>High quality product suitable for all needs. Durable, reliable, and authentic.</p>
                </div>
                
                <div className="mb-8">
                     <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
                         product.stock === 'out_of_stock' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                     }`}>
                         {product.stock === 'out_of_stock' ? 'Out of Stock' : 'Available in Store'}
                     </span>
                </div>

                <div className="flex gap-4">
                     <a 
                        href={`https://wa.me/919999999999?text=Hi, I want to enquire about ${product.title}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#25D366] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                     >
                         <FaWhatsapp className="w-6 h-6" /> Enquire on WhatsApp
                     </a>
                </div>
                
                <p className="mt-4 text-xs text-gray-400 text-center">
                    Order directly via WhatsApp or visit our store in Poonoor.
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}
