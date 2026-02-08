'use client'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { FaWhatsapp, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const isSale = product.discountedPrice && product.discountedPrice < product.price
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          <Link href={`/product/${product.slug.current}`}>
            {product.images?.[0] ? (
              <img 
                src={urlFor(product.images[0]).width(600).height(750).url()} 
                alt={product.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
            )}
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
            href={`https://wa.me/919999999999?text=Hi, I am interested in ${product.title}`}
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
