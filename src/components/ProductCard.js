'use client'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { FaWhatsapp, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function ProductCard({ product, settings }) {
  const isSale = product.discountedPrice && product.discountedPrice < product.price
  const whatsappNumber = settings?.contactNumber || '919999999999';
  
  const hasImage = product.images && product.images.length > 0
  const productImageUrl = hasImage 
    ? urlFor(product.images[0]).width(600).height(600).url() 
    : `https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop&sig=${product._id}`; // Default placeholder

  // Dynamic placeholders based on category
  const categoryPlaceholder = {
    'Pens': 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600',
    'Notebooks': 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600',
    'Art Supplies': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600',
    'Office': 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=600',
    'Books': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600'
  }[product.category?.title] || productImageUrl;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 flex-shrink-0">
          <Link href={`/product/${product.slug.current}`}>
            <img 
              src={hasImage ? urlFor(product.images[0]).width(800).height(1000).url() : categoryPlaceholder} 
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
           </Link>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
                <span className="bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm tracking-wide">
                    New
                </span>
            )}
            {product.badges?.map(badge => (
                <span key={badge} className={`text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm tracking-wide ${
                    badge === 'Offer' ? 'bg-red-500' : 
                    badge === 'Popular' ? 'bg-amber-500' : 'bg-blue-500'
                }`}>
                    {badge}
                </span>
            ))}
            {isSale && !product.badges?.includes('Offer') && (
                 <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm tracking-wide">
                    Offer
                 </span>
            )}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
            <Link href={`/category/${product.category?.slug?.current}`} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#0f4c81]">
            {product.category?.title || 'Collection'}
            </Link>
        </div>
        
        <Link href={`/product/${product.slug.current}`} className="font-semibold text-gray-800 text-sm mb-2 block line-clamp-2 hover:text-[#0f4c81] flex-1" title={product.title}>
          {product.title}
        </Link>
        
        <div className="flex items-baseline gap-2 mt-auto mb-4">
            {isSale ? (
                <>
                    <span className="text-lg font-bold text-gray-900">₹{product.discountedPrice}</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                    <span className="text-xs text-red-500 font-medium">
                        {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                    </span>
                </>
            ) : (
                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            )}
        </div>

        {/* Enquire Button */}
        <a 
            href={`https://wa.me/${whatsappNumber}?text=Hi, I am interested in ${product.title}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-sm text-sm"
        >
            <FaWhatsapp className="w-4 h-4" /> Enquire Now
        </a>
      </div>
    </motion.div>
  )
}
