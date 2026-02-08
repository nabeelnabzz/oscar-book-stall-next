import { client, urlFor } from '@/lib/sanity'
import HeroSlider from '@/components/HeroSlider'
import ProductGrid from '@/components/ProductGrid'
import QuickActions from '@/components/QuickActions'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

async function getData() {
  const bannerQuery = `*[_type == "banner"]{
      _id,
      title,
      subtitle,
      image,
      productImage,
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
  const newArrivalsQuery = `*[_type == "product" && (isNew == true || "New" in badges)][0...8]{
      _id,
      title,
      slug,
      price,
      discountedPrice,
      images,
      badges,
      category->{title, slug}
  }`
  const offerProductsQuery = `*[_type == "product" && (defined(discountedPrice) || "Offer" in badges)][0...8]{
      _id,
      title,
      slug,
      price,
      discountedPrice,
      images,
      badges,
      category->{title, slug}
  }`
  const trendingQuery = `*[_type == "product" && ("Popular" in badges || "Best Seller" in badges)][0...8]{
      _id,
      title,
      slug,
      price,
      discountedPrice,
      images,
      badges,
      category->{title, slug}
  }`
  const settingsQuery = `*[_type == "siteSettings"][0]{
      title,
      aboutImage,
      contactNumber,
      quickActions[]{
          label,
          link,
          image
      }
  }`
  const storyQuery = `*[_type == "story"]{
      _id,
      title,
      author,
      image,
      role,
      content,
      image_url
  }`
  const offerQuery = `*[_type == "offer" && isActive == true]{
      _id,
      title,
      description,
      image,
      image_url,
      discountCode
  }`
  
  try {
      const [banners, newArrivals, offerProducts, trending, categories, settings, stories, offers] = await Promise.all([
        client.fetch(bannerQuery),
        client.fetch(newArrivalsQuery),
        client.fetch(offerProductsQuery),
        client.fetch(trendingQuery),
        client.fetch(categoryQuery),
        client.fetch(settingsQuery),
        client.fetch(storyQuery),
        client.fetch(offerQuery)
      ])
      return { banners, newArrivals, offerProducts, trending, categories, settings, stories, offers }
  } catch (error) {
      console.error("Sanity Fetch Error:", error)
      return { banners: [], products: [], categories: [] }
  }
}

export default async function Home() {
  const data = await getData()
  
  // Fallback banners if none exist in Sanity
  const banners = data.banners.length > 0 ? data.banners : [
    {
      _id: 'banner-1',
      title: 'Premium Stationery Store',
      subtitle: 'Higher Education & Office Essentials for Every Student',
      image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=2000&auto=format&fit=crop',
      layout: 'left',
      textColor: 'text-white',
      overlayOpacity: 40,
      buttonText: 'Shop New Arrivals',
      link: '/new-arrivals'
    },
    {
      _id: 'banner-2',
      title: 'Elevate Your Workspace',
      subtitle: 'Professional Office Tools & Premium Writing Instruments',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2000&auto=format&fit=crop',
      layout: 'right',
      textColor: 'text-white',
      overlayOpacity: 30,
      buttonText: 'Explore Collection',
      link: '/products'
    },
    {
      _id: 'banner-3',
      title: 'Creative Corner',
      subtitle: 'Premium Art Supplies & Journaling Essentials',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop',
      layout: 'center',
      textColor: 'text-white',
      overlayOpacity: 50,
      buttonText: 'Exclusive Offers',
      link: '/offers'
    }
  ]
  
  // Map local fallbacks for common categories
  const categories = data.categories.map(cat => {
    if (!cat.image) {
      if (cat.title === 'Pens') return { ...cat, fallbackImage: 'https://images.unsplash.com/photo-1585336261022-69c6e29ce33d?q=80&w=800' }
      if (cat.title === 'Notebooks') return { ...cat, fallbackImage: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800' }
      if (cat.title === 'Art Supplies') return { ...cat, fallbackImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800' }
      if (cat.title === 'Office') return { ...cat, fallbackImage: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=800' }
      if (cat.title === 'Books') return { ...cat, fallbackImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800' }
      // Generic Stationery fallback
      return { ...cat, fallbackImage: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=800' }
    }
    return cat
  })

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <HeroSlider banners={banners} />
      
      <QuickActions settings={data.settings} />

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
      
      {/* New Arrivals Section */}
      <section className="bg-white py-12 md:py-20">
         <div className="container px-4">
            <div className="relative flex items-center justify-center mb-10">
                <h2 className="text-3xl font-bold text-[#0f4c81] tracking-tight uppercase">NEW ARRIVALS</h2>
                <Link href="/new-arrivals" className="absolute right-0 text-[#0f4c81] font-semibold hover:underline hidden md:block">View All</Link>
            </div>
            <ProductGrid products={data.newArrivals} title="" settings={data.settings} />
            <div className="md:hidden mt-8 text-center">
                <Link href="/new-arrivals" className="text-[#0f4c81] font-semibold hover:underline">View All New Arrivals</Link>
            </div>
         </div>
      </section>

      {/* Trending Now / Best Sellers */}
      <section className="bg-gray-50 py-12 md:py-20 border-t border-b">
         <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center text-[#0f4c81] tracking-tight">TRENDING NOW</h2>
            <ProductGrid products={data.trending} title="" settings={data.settings} />
         </div>
      </section>
      
      {/* Dynamic Offers Section */}
      <section id="exclusive-offers" className="py-20 bg-red-50">
          <div className="container px-4">
              <div className="relative flex items-center justify-center mb-10">
                  <h2 className="text-3xl font-bold text-red-600 uppercase tracking-widest">EXCLUSIVE OFFERS</h2>
                  <Link href="/offers" className="absolute right-0 text-red-600 font-semibold hover:underline hidden md:block">View All</Link>
              </div>
              
              {data.offers?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {data.offers.map(offer => (
                        <Link key={offer._id} href="/offers" className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:scale-[1.02] transition-transform duration-300">
                            {(offer.image || offer.image_url) && (
                                <div className="aspect-[16/9] overflow-hidden">
                                    <img src={offer.image ? urlFor(offer.image).width(800).url() : offer.image_url} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors uppercase">{offer.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{offer.description}</p>
                                {offer.discountCode && (
                                    <div className="bg-gray-100 p-3 rounded-lg border border-dashed border-gray-400 text-center font-mono font-bold text-[#0f4c81]">
                                        {offer.discountCode}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
              )}

              {data.offerProducts?.length > 0 && (
                  <div className="mt-20">
                      <h3 className="text-2xl font-bold mb-10 text-center text-[#0f4c81] tracking-tight uppercase">DISCOUNTED PRODUCTS</h3>
                      <ProductGrid products={data.offerProducts} title="" settings={data.settings} />
                  </div>
              )}
              <div className="md:hidden mt-8 text-center text-red-600 font-semibold hover:underline">
                  <Link href="/offers">View All Offers</Link>
              </div>
          </div>
      </section>

      {/* Community / Blog Teaser - Now Dynamic */}
      <section className="py-20 bg-[#f9fafb] border-t">
         <div className="container">
             <div className="text-center mb-16">
                 <span className="text-[#f59e0b] font-bold tracking-wider text-sm uppercase mb-2 block">Community</span>
                 <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1f2937]">Stories from Our Stationery Community</h2>
                 <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                     See how creators, students, and professionals use our tools to bring their ideas to life.
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.stories?.length > 0 ? (
                    data.stories.map(story => (
                        <div key={story._id} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                            {(story.image || story.image_url) && (
                                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6">
                                    <img 
                                        src={story.image ? urlFor(story.image).width(200).height(200).url() : story.image_url} 
                                        alt={story.author} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            )}
                            <h4 className="text-xl font-bold mb-1">{story.title}</h4>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">{story.author} • {story.role}</p>
                            <p className="text-gray-600 italic leading-relaxed line-clamp-4">"{story.content}"</p>
                        </div>
                    ))
                ) : (
                    // Fallback placeholders if no stories
                    [1,2,3].map(i => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 animate-pulse">
                            <div className="w-20 h-20 bg-gray-200 rounded-2xl mb-6"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                        </div>
                    ))
                )}
             </div>

             <div className="flex justify-center gap-4 mt-16">
                <button className="bg-[#0f4c81] text-white px-10 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-shadow shadow-lg">
                    Read more Stories
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
