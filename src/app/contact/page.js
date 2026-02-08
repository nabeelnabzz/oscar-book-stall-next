import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-12 text-center">Get in Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-full text-[#0f4c81]"><FaPhoneAlt /></div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Phone</h3>
                            <p className="text-gray-600">+91 99999 99999</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="bg-green-50 p-3 rounded-full text-green-600"><FaWhatsapp /></div>
                        <div>
                            <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                             <p className="text-gray-600">+91 99999 99999</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-orange-50 p-3 rounded-full text-orange-600"><FaEnvelope /></div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Email</h3>
                             <p className="text-gray-600">contact@oscaredu.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-3 rounded-full text-gray-600"><FaMapMarkerAlt /></div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Store Location</h3>
                             <p className="text-gray-600">
                                Opposite Shine Hotel,<br/>
                                Poonoor, Kozhikode,<br/>
                                Kerala, India.
                             </p>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 font-medium">
                    Google Map Embed
                </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Send an Inquiry</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input type="text" className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-[#0f4c81] outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-[#0f4c81] outline-none transition-all" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message / Product Request</label>
                        <textarea className="w-full border rounded-lg p-3 bg-gray-50 h-32 focus:ring-2 focus:ring-[#0f4c81] outline-none transition-all" placeholder="I am looking for..."></textarea>
                    </div>
                    <button type="button" className="w-full bg-[#0f4c81] text-white font-bold py-3 rounded-lg hover:bg-[#0a365c] transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}
