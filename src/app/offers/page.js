import { client, urlFor } from '@/lib/sanity'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60

async function getOffers() {
  return await client.fetch(`*[_type == "offer" && isActive == true]{
      _id,
      title,
      description,
      image,
      image_url,
      discountCode
  }`)
}

async function getProductsOnOffer() {
    return await client.fetch(`*[_type == "product" && (defined(discountedPrice) || "Offer" in badges)]{
        _id,
        title,
        slug,
        price,
        discountedPrice,
        images,
        badges,
        category->{title, slug}
    }`)
}

async function getSettings() {
    return await client.fetch(`*[_type == "siteSettings"][0]{contactNumber}`)
}

export default async function OffersPage() {
  const [offers, products, settings] = await Promise.all([
    getOffers(),
    getProductsOnOffer(),
    getSettings()
  ])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 text-center text-red-600">Exclusive Offers</h1>
        
        {offers.length > 0 ? (
            <div className="space-y-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {offers.map(offer => (
                        <div key={offer._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 h-64 relative">
                                 {(offer.image || offer.image_url) ? (
                                    <img 
                                        src={offer.image ? urlFor(offer.image).width(600).height(600).url() : offer.image_url} 
                                        className="w-full h-full object-cover"
                                        alt={offer.title}
                                    />
                                 ) : (
                                    <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-300 font-bold text-4xl">%</div>
                                 )}
                            </div>
                            <div className="p-8 md:w-1/2 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-2 text-gray-800">{offer.title}</h3>
                                <p className="text-gray-600 mb-6">{offer.description}</p>
                                {offer.discountCode && (
                                    <div className="bg-gray-100 p-4 rounded-lg text-center border border-dashed border-gray-400">
                                        <span className="text-xs uppercase text-gray-500 block mb-1">Use Code</span>
                                        <span className="text-xl font-mono font-bold text-[#0f4c81] tracking-widest">{offer.discountCode}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {products.length > 0 && (
                    <div className="pt-12 border-t">
                        <h2 className="text-3xl font-bold mb-10 text-center text-[#0f4c81]">Products on Offer</h2>
                        <ProductGrid products={products} title="" settings={settings} />
                    </div>
                )}
            </div>
        ) : (
            <div className="space-y-20">
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                    <p className="text-gray-500 text-lg">No active offer banners at the moment. Check back later!</p>
                </div>
                
                {products.length > 0 && (
                    <div className="pt-12 border-t">
                        <h2 className="text-3xl font-bold mb-10 text-center text-[#0f4c81]">Products on Offer</h2>
                        <ProductGrid products={products} title="" settings={settings} />
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  )
}
