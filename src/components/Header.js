'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FaSearch, FaPhoneAlt } from 'react-icons/fa'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="w-full font-sans shadow-md fixed top-0 z-50 bg-white">
      {/* Top Bar */}
      <div className="bg-[#0f4c81] text-white text-[10px] md:text-xs py-2">
        <div className="container flex justify-between items-center px-4">
          <p className="hidden md:block">Oscar Edu Hyper Mart - Everything for Learning</p>
          <p className="md:hidden">Oscar Edu Hyper Mart</p>
          <div className="flex items-center gap-4">
             <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-gray-200"><FaPhoneAlt /> +91 99999 99999</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="py-2 bg-white relative z-50">
        <div className="container flex items-center justify-between gap-4 px-4">
          {/* Logo */}
          <Link href="/" className="block">
             <Image 
                src="/logo-new.jpg" 
                alt="Oscar Edu Hyper Mart" 
                width={200} 
                height={80} 
                className="h-16 w-auto md:h-20 object-contain"
                priority
             />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-700 text-sm">
             <Link href="/" className="hover:text-[#0f4c81] transition-colors">Home</Link>
             <Link href="/products" className="hover:text-[#0f4c81] transition-colors">Products</Link>
             <Link href="/new-arrivals" className="hover:text-[#0f4c81] transition-colors flex items-center gap-1">
                New Arrivals <span className="bg-green-500 text-white text-[8px] px-1 rounded">NEW</span>
             </Link>
             <Link href="/offers" className="hover:text-[#0f4c81] transition-colors text-red-600">Offers</Link>
             <Link href="/about" className="hover:text-[#0f4c81] transition-colors">About Us</Link>
             <Link href="/contact" className="bg-[#0f4c81] text-white px-4 py-2 rounded-full hover:bg-[#0a365c] transition-colors">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-t overflow-hidden"
            >
                <nav className="flex flex-col p-4 space-y-4 font-medium text-gray-700">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
                    <Link href="/new-arrivals" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
                    <Link href="/offers" onClick={() => setIsMenuOpen(false)} className="text-red-500">Offers</Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                </nav>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
