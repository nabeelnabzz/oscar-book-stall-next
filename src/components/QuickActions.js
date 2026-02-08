import Link from 'next/link'
import { FaBoxOpen, FaFire, FaPercentage, FaPhoneAlt } from 'react-icons/fa'

export default function QuickActions() {
  const actions = [
    { 
      label: 'View All Products', 
      href: '/products', 
      icon: <FaBoxOpen className="w-6 h-6" />, 
      color: 'bg-blue-600', 
      desc: 'Browse full catalog' 
    },
    { 
      label: 'New Arrivals', 
      href: '/new-arrivals', 
      icon: <FaFire className="w-6 h-6" />, 
      color: 'bg-green-600',
      desc: 'Latest additions'
    },
    { 
      label: 'Exclusive Offers', 
      href: '/offers', 
      icon: <FaPercentage className="w-6 h-6" />, 
      color: 'bg-red-600',
      desc: 'Discounts & Deals'
    },
    { 
      label: 'Contact Us', 
      href: '/contact', 
      icon: <FaPhoneAlt className="w-6 h-6" />, 
      color: 'bg-gray-800',
      desc: 'Get in touch'
    },
  ]

  return (
    <section className="py-8 container mt-10 mb-24 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, idx) => (
          <Link 
            key={idx} 
            href={action.href}
            className="group flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <div className={`${action.color} text-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#0f4c81] transition-colors">{action.label}</h3>
              <p className="text-xs text-gray-500 font-medium">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
