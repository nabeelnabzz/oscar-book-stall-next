import Link from 'next/link'
import { FaBoxOpen, FaFire, FaPercentage, FaPhoneAlt } from 'react-icons/fa'
import { urlFor } from '@/lib/sanity'

export default function QuickActions({ settings }) {
  const whatsappNumber = settings?.contactNumber || '919999999999';
  
  // Use Sanity-defined actions if they exist, otherwise fallback
  const actions = settings?.quickActions?.length > 0 
    ? settings.quickActions.map(action => ({
        label: action.label,
        href: action.link,
        image: action.image,
        color: 'bg-[#0f4c81]' // Default color for dynamic actions
      }))
    : [
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
          href: `https://wa.me/${whatsappNumber}`, 
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
            <div className={`${action.color} text-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center overflow-hidden`}>
              {action.image ? (
                  <img src={urlFor(action.image).width(100).height(100).url()} alt={action.label} className="w-full h-full object-cover" />
              ) : action.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#0f4c81] transition-colors">{action.label}</h3>
              {action.desc && <p className="text-xs text-gray-500 font-medium">{action.desc}</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
