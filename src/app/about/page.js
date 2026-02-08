export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#0f4c81] text-white py-20 text-center">
         <div className="container">
             <h1 className="text-4xl md:text-5xl font-bold mb-4">About Oscar Edu Hyper Mart</h1>
             <p className="text-xl opacity-90 max-w-2xl mx-auto">Empowering learning since 2010.</p>
         </div>
      </div>

      <div className="container py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                 <h2 className="text-3xl font-bold mb-6 text-gray-800">Who We Are</h2>
                 <p className="text-gray-600 mb-4 leading-relaxed">
                     Oscar Edu Hyper Mart is your one-stop destination for all educational needs. 
                     From school textbooks and premium stationery to office supplies and art materials, 
                     we curate the best products to fuel your creativity and learning journey.
                 </p>
                 <p className="text-gray-600 leading-relaxed">
                     Located in the heart of Poonoor, generally we have served thousands of students and professionals 
                     with quality products at affordable prices.
                 </p>
            </div>
            <div className="bg-gray-100 rounded-2xl h-[400px] flex items-center justify-center">
                <span className="text-gray-400 font-bold">Store Image Placeholder</span>
            </div>
         </div>
      </div>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
          <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0f4c81] text-2xl font-bold">Q</div>
                      <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                      <p className="text-gray-500">Only the best brands that last longer.</p>
                  </div>
                  <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-2xl font-bold">₹</div>
                      <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
                      <p className="text-gray-500">Student-friendly prices and regular offers.</p>
                  </div>
                  <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 text-2xl font-bold">♥</div>
                      <h3 className="text-xl font-bold mb-2">Trusted by Schools</h3>
                      <p className="text-gray-500">Partnered with top institutions in the region.</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  )
}
