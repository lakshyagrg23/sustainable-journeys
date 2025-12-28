import React from 'react'

function Choice() {
  return (
    <section className="py-8 px-2 text-center">
      <h2 className="text-2xl md:text-5xl font-bold text-indigo-800 mb-8">
        Why Choose Us? 🤔
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">


        <div className="bg-white rounded-xl shadow p-3 md:p-6 text-sm md:text-base hover:-translate-y-1 transition">
          <div className="w-10 h-10 md:w-16 md:h-16 mx-auto text-blue-600 mb-2">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C7.589 2 4 5.589 4 10c0 4.411 8 12 8 12s8-7.589 8-12c0-4.411-3.589-8-8-8zm0 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
            </svg>
          </div>
          <h3 className="text-base md:text-xl font-semibold text-indigo-700 mb-1">Local Expertise</h3>
          <p className="text-gray-600">We know the routes, the secrets, and the stories behind every wave and shore.</p>
        </div>


        <div className="bg-indigo-50 rounded-xl shadow p-3 md:p-6 text-sm md:text-base hover:scale-105 transition">
          <div className="w-10 h-10 md:w-16 md:h-16 mx-auto text-indigo-600 mb-2">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 12l-2.121-2.121a1 1 0 0 0-1.414 0L4.757 15.586a1 1 0 0 0 0 1.414l.707.707a1 1 0 0 0 1.414 0L12.586 12l1.414-1.414z" />
            </svg>
          </div>
          <h3 className="text-base md:text-xl font-semibold text-indigo-700 mb-1">Custom-Tailored Itineraries</h3>
          <p className="text-gray-700">No cookie-cutter packages. Every trip is crafted to match your style and pace.</p>
        </div>


        <div className="bg-white border border-blue-200 rounded-xl shadow-sm p-3 md:p-6 text-sm md:text-base hover:shadow-lg transition">
          <div className="w-10 h-10 md:w-16 md:h-16 mx-auto text-blue-500 mb-2">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.683 5.343A1 1 0 0 0 9.999 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 .343.742l7.258 7.258a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0 0-1.414l-7.332-7.243z" />
            </svg>
          </div>
          <h3 className="text-base md:text-xl font-semibold text-blue-600 mb-1">Adventure & Comfort</h3>
          <p className="text-gray-600">From adrenaline-pumping water sports to serene beach stays, we blend thrill with relaxation.</p>
        </div>


        <div className="bg-blue-50 rounded-xl p-3 md:p-6 text-sm md:text-base shadow-md hover:-translate-y-1 transition">
          <div className="w-10 h-10 md:w-16 md:h-16 mx-auto text-indigo-700 mb-2">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 1H7c-1.103 0-2 .897-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3c0-1.103-.897-2-2-2zM12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
          </div>
          <h3 className="text-base md:text-xl font-semibold text-indigo-800 mb-1">Personal Touch</h3>
          <p className="text-gray-700">For us, every guest is family. Expect care, attention, and genuine hospitality.</p>
        </div>
      </div>
    </section>
  )
}

export default Choice