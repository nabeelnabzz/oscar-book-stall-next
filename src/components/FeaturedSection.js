'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FeaturedSection() {
  return (
    <section className="py-12 container">
      {/* Top Red Banner - Animate from left */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative bg-[#d3122a] rounded-3xl p-8 md:p-12 mb-8 overflow-hidden flex flex-col md:flex-row items-center justify-between text-white min-h-[300px] shadow-2xl"
      >
        <div className="z-10 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Everyday Essentials, Curated</h2>
          <p className="text-lg opacity-90 mb-0">
            Pens, notebooks, planners & tools <br className="hidden md:block"/>
            that fit seamlessly into your daily routine.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
      </motion.div>

      {/* Three Column Grid - Staggered Animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blue Card */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#78b7d0] rounded-2xl p-8 text-white relative overflow-hidden min-h-[350px] flex flex-col justify-center shadow-lg hover:shadow-2xl transition-shadow"
        >
            <h3 className="text-2xl font-bold mb-4">Stationery that <br/> inspires every Day</h3>
            <p className="text-sm opacity-90 mb-8 max-w-[80%]">
                From pens that glide effortlessly to notebooks that hold your thoughts.
            </p>
            <Link href="/category/pens" className="bg-white text-black text-xs font-bold py-3 px-6 rounded-full w-fit hover:bg-gray-100 transition-colors">
                Shop Now
            </Link>
             <div className="absolute -right-4 bottom-4 w-32 h-40 bg-white/10 rotate-12 rounded-lg"></div>
        </motion.div>

        {/* Yellow Card */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#f2d02c] rounded-2xl p-8 text-white relative overflow-hidden min-h-[350px] flex flex-col justify-center shadow-lg hover:shadow-2xl transition-shadow"
        >
            <h3 className="text-2xl font-bold mb-4">Organize, focus, <br/> achieve</h3>
            <p className="text-sm opacity-90 mb-8 max-w-[80%]">
                Smart storage, sleek folders, and functional tools.
            </p>
            <Link href="/category/organizers" className="bg-white text-black text-xs font-bold py-3 px-6 rounded-full w-fit hover:bg-gray-100 transition-colors">
                Shop Now
            </Link>
            <div className="absolute -right-4 bottom-4 w-32 h-32 bg-white/10 rounded-lg"></div>
        </motion.div>

        {/* Teal Card */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#8ecbc3] rounded-2xl p-8 text-white relative overflow-hidden min-h-[350px] flex flex-col justify-center shadow-lg hover:shadow-2xl transition-shadow"
        >
            <h3 className="text-2xl font-bold mb-4">Where ideas <br/> take shape</h3>
            <p className="text-sm opacity-90 mb-8 max-w-[80%]">
                Premium art materials that let your imagination run free.
            </p>
            <Link href="/category/art-supplies" className="bg-white text-black text-xs font-bold py-3 px-6 rounded-full w-fit hover:bg-gray-100 transition-colors">
                Shop Now
            </Link>
            <div className="absolute -right-4 bottom-4 w-32 h-40 bg-white/10 -rotate-6 rounded-lg"></div>
        </motion.div>
      </div>
    </section>
  )
}
