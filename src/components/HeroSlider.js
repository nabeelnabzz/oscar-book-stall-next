'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeroSlider({ banners = [] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })])

  if (!banners.length) {
    return <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center animate-pulse"></div>
  }

  return (
    <div className="overflow-hidden bg-gray-900 group mb-10" ref={emblaRef}>
      <div className="flex">
        {banners.map((banner) => {
          // Dynamic classes based on schema
          const layoutClass = 
              banner.layout === 'left' ? 'items-start text-left px-12 md:px-24' :
              banner.layout === 'right' ? 'items-end text-right px-12 md:px-24' : 
              'items-center text-center px-4';
              
          const textColor = banner.textColor || 'text-white';
          const opacity = banner.overlayOpacity ? banner.overlayOpacity / 100 : 0.2;

          return (
            <div className="flex-[0_0_100%] min-w-0 relative h-[500px] md:h-[700px]" key={banner._id}>
               {/* Background Image with Zoom Effect */}
               <div className="absolute inset-0 overflow-hidden">
                   {banner.image && (
                       <motion.img 
                          initial={{ scale: 1 }}
                          whileInView={{ scale: 1.05 }}
                          transition={{ duration: 10, ease: "linear" }}
                          src={typeof banner.image === 'string' ? banner.image : urlFor(banner.image).width(1920).height(1080).quality(90).url()} 
                          alt={banner.title} 
                          className="w-full h-full object-cover"
                       />
                   )}
               </div>

               {/* Dynamic Overlay */}
               <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
               />

               {/* Content Container */}
               <div className={`absolute inset-0 flex flex-col justify-center ${layoutClass}`}>
                   <div className="max-w-3xl z-10">
                       <motion.h2 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`text-5xl md:text-8xl font-black mb-6 tracking-tight leading-none ${textColor}`}
                       >
                          {banner.title}
                       </motion.h2>
                       
                       <motion.p 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          className={`text-lg md:text-3xl mb-10 font-light opacity-90 ${textColor}`}
                       >
                          {banner.subtitle}
                       </motion.p>
                       
                       {banner.link && (
                           <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                           >
                              <Link 
                                  href={banner.link} 
                                  className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#0f4c81] hover:text-white transition-all duration-300 shadow-2xl hover:scale-105"
                              >
                                  {banner.buttonText || "Shop Now"}
                              </Link>
                           </motion.div>
                       )}
                   </div>

                   {/* Floating Product Image */}
                   {banner.productImage && (
                       <motion.div 
                          initial={{ opacity: 0, x: 50, rotate: 10 }}
                          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                          className={`hidden lg:block absolute ${banner.layout === 'right' ? 'left-24' : 'right-24'} top-1/2 -translate-y-1/2 w-1/3 aspect-square`}
                       >
                           <img 
                               src={urlFor(banner.productImage).width(800).url()} 
                               alt="Featured Product" 
                               className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                           />
                       </motion.div>
                   )}
               </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
