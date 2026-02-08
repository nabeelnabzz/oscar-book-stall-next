import { client, urlFor } from '@/lib/sanity'
import HeroSlider from '@/components/HeroSlider'
import ProductGrid from '@/components/ProductGrid'
import FeaturedSection from '@/components/FeaturedSection'
import QuickActions from '@/components/QuickActions'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

async function getData() {
  const bannerQuery = `*[_type == "banner"]{
      _id,
      title,
      subtitle,
      image,
      link,
      layout,
      textColor,
      overlayOpacity,
      buttonText
  }`
  // Fetch distinct categories for a section (optional)
  const categoryQuery = `*[_type == "category"]{
      _id,
      title,
      slug,
      image
  }`
  const productQuery = `*[_type == "product"][0...8]{
      _id,
      title,
      slug,
      price,
      discountedPrice,
      images,
      category->{title, slug}
  }`
  
  try {
      const [banners, products, categories] = await Promise.all([
        client.fetch(bannerQuery),
        client.fetch(productQuery),
        client.fetch(categoryQuery)
      ])
      return { banners, products, categories }
  } catch (error) {
      console.error("Sanity Fetch Error:", error)
      return { banners: [], products: [], categories: [] }
  }
}

export default async function Home() {
  const data = await getData()
  
  // Fallback banner if none exist in Sanity
  const banners = data.banners.length > 0 ? data.banners : [
    {
      _id: 'default-banner',
      title: 'Premium Stationery Store',
      subtitle: 'Higher Education & Office Essentials',
      image: '/banner-hero.png', // local fallback
      layout: 'center',
      textColor: 'text-white',
      overlayOpacity: 30,
      buttonText: 'Shop Catalog',
      link: '/products'
    }
  ]
  const products = data.products
  
  // Map local fallbacks for common categories
  const categories = data.categories.map(cat => {
    if (!cat.image) {
      if (cat.title === 'Pens') return { ...cat, fallbackImage: '/cat-pens.png' }
      if (cat.title === 'Notebooks') return { ...cat, fallbackImage: '/cat-notebooks.png' }
    }
    return cat
  })

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <HeroSlider banners={banners} />
      
      <QuickActions />

      {/* Featured Categories - Redesigned */}
      <section className="py-16 md:py-20 bg-white mt-12">
        <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center tracking-tight text-[#0f4c81]">SHOP BY CATEGORY</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map(cat => (
                    <Link key={cat._id} href={`/category/${cat.slug.current}`} className="group relative block aspect-square overflow-hidden rounded-2xl bg-gray-100">
                         {cat.image || cat.fallbackImage ? (
                             <img 
                                src={cat.image ? urlFor(cat.image).width(400).height(400).url() : cat.fallbackImage} 
                                alt={cat.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                             />
                         ) : (
                             <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                 <span className="text-4xl opacity-20">#</span>
                             </div>
                         )}
                         {/* Overlay and Title */}
                         <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-end h-full">
                             <span className="text-white font-bold text-lg tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                                 {cat.title}
                             </span>
                         </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>
      
      {/* New Arrivals with Animation Container */}
      <div className="bg-white py-4">
         <ProductGrid products={products} title="New Arrivals" />
      </div>

      {/* Best Sellers */}
      <ProductGrid products={products} title="Best Sellers" />
      
      {/* Community / Blog Teaser */}
      <section className="py-20 bg-[#f9fafb] mt-12 border-t">
         <div className="container text-center">
             <span className="text-[#f59e0b] font-bold tracking-wider text-sm uppercase mb-2 block">Community</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1f2937]">Stories from Our Stationery Community</h2>
             <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
                 See how creators, students, and professionals use our tools to bring their ideas to life.
             </p>
             <div className="flex justify-center gap-4">
                <button className="bg-[#0f4c81] text-white px-10 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-shadow shadow-lg">
                    Read the Blog
                </button>
                <button className="bg-white text-[#0f4c81] border border-[#0f4c81] px-10 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                    Join Us
                </button>
             </div>
         </div>
      </section>
    </div>
  )
}
