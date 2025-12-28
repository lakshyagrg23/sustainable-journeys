// import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
//import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle, FaGavel, FaPhone, FaEnvelope, FaMapMarkerAlt, FaShip, FaUmbrella, FaCar } from 'react-icons/fa';
import { CheckCircle, XCircle, FileText, CreditCard, RotateCcw, AlertTriangle, Scale } from 'lucide-react';

//import Image from 'next/image';

export const metadata = {
  title: 'Terms & Conditions - Saarthi Andaman',
  description: 'Terms, policies and travel guidelines for bookings with Saarthi Andaman.'
}

const TermsAndConditionsPage = () => {
  return (<>
    <Navbar />
    <div className="bg-white font-sans text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 via-teal-500 to-green-500">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`
          }}
        ></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Saarthi Andaman
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl">
              Your Gateway to Paradise - Terms, Policies & Travel Guidelines
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
              <span className="text-white font-semibold">🏝️ Andaman & Nicobar Islands Specialist</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Inclusions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Inclusions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Accommodation in standard/deluxe rooms at Sri Vijaya Puram (Port Blair), Swaraj Dweep (Havelock), and Shaheed Dweep (Neil Islands), with breakfast and all applicable taxes (on double/triple sharing basis).",
              "Meet & Greet service upon arrival at the airport.",
              "All sightseeing and transfers by private AC vehicle across all islands.",
              "Transfers to Swaraj Dweep (Havelock) and Shaheed Dweep Island (Neil Island) via Nautika / Makruzz / Green Ocean ferries.",
              "Full-day tours as per itinerary, including airport pick-up and drop.",
              "All entry tickets, ferry tickets, and permit charges are included.",
              "Dedicated Personal Tour Coordinator as a single point of contact.",
              "Field travel assistance at major locations (Airport, Jetty, Cellular Jail, Water Sports Complex, Swaraj Dweep (Havelock), Shaheed Dweep (Neil Island), etc.",
              "Dedicated AC vehicle as per itinerary (not on disposal basis).",
              "GST included in the package cost."
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center gap-3 mb-6">
            <XCircle className="text-red-500 w-6 h-6 flex-shrink-0" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Exclusions</h2>
          </div>

          <div className="space-y-3">
            {[
              "Flight tickets (not included in the package).",
              "Lunch and dinner, unless specifically mentioned.",
              "Vehicles are not at disposal on any island.",
              "Personal expenses: laundry, telephone calls, room service, alcoholic/non-alcoholic beverages, etc.",
              "Any unforeseen expenses due to natural calamities, weather conditions, ferry delays, strikes, or force majeure.",
              "Additional activities or services not explicitly mentioned in the inclusions."
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking & Payment Policy */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-blue-500 w-6 h-6 flex-shrink-0" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Booking & Payment Policy</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Booking Confirmation</h3>
              <div className="space-y-2 ml-4">
                <p className="text-sm md:text-base text-gray-700">• A 50%–70% advance payment is required to confirm the package.</p>
                <p className="text-sm md:text-base text-gray-700">• Submission of Valid Photo ID proof with address of all travellers are mandatory at the time of booking.</p>
                <p className="text-sm md:text-base text-gray-700">• Share complete flight details along with the full name, age, and gender of each traveler.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Balance Payment</h3>
              <div className="ml-4">
                <p className="text-sm md:text-base text-gray-700">• Remaining payment to be settled at least 2 days prior to arrival or in cash upon arrival (maximum ₹2,00,000 in cash permitted with valid PAN card).</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Accepted Payment Modes</h3>
              <div className="space-y-2 ml-4">
                <p className="text-sm md:text-base text-gray-700">• Online bank transfers and cash payments in INR only.</p>
                <p className="text-sm md:text-base text-gray-700">• Cheque payments are not accepted.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="text-orange-500 w-6 h-6 flex-shrink-0" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Cancellation Policy</h2>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm md:text-base text-gray-800 font-medium">10 days or less before arrival</p>
                <p className="text-red-600 font-bold">100% cancellation (No refund)</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm md:text-base text-gray-800 font-medium">11–20 days before arrival</p>
                <p className="text-orange-600 font-bold">50% cancellation charge</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm md:text-base text-gray-800 font-medium">21–30 days before arrival</p>
                <p className="text-yellow-600 font-bold">25% cancellation charge</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm md:text-base text-gray-800 font-medium">Above 30 days</p>
                <p className="text-green-600 font-bold">Full refund (₹1,500 per person deduction)</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm md:text-base text-gray-700">• No rescheduling allowed once the booking is confirmed.</p>
              <p className="text-sm md:text-base text-gray-700">• 100% cancellation applies for hotels such as SeaShell, Coral Reef, Barefoot, Munjoh, Taj, once advance is paid.</p>
              <p className="text-sm md:text-base text-gray-700">• No refunds for bookings during 15th December to 15th January (peak season).</p>
              <p className="text-sm md:text-base text-gray-700">• No refund for cancellation/delay of flights. The trip proceeds only if the guest reaches the destination at their own cost.</p>
            </div>
          </div>
        </div>

        {/* General Terms */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-purple-500 w-6 h-6 flex-shrink-0" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">General Terms & Conditions</h2>
          </div>

          <div className="space-y-3">
            {[
              "All water activities and ferry operations are subject to weather conditions. If canceled, no refund will be provided, but alternate arrangements will be made where possible.",
              "Rooms are subject to availability at the time of booking. Equivalent alternatives will be provided if necessary.",
              "Itinerary flow may change due to operational or logistical reasons; however, all destinations will be attempted to be covered.",
              "Guests must comply with rules and regulations of hotels, ferries, and transport operators.",
              "Original Photo ID must be presented at check-ins (hotels, ferry, airport, etc.).",
              "The company reserves the right to refuse service to any guest found misbehaving, violating rules, or engaging in illegal activity."
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <AlertTriangle className="text-purple-500 w-4 h-4 mt-1 flex-shrink-0" />
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Liability & Legal */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-600">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="text-gray-600 w-6 h-6 flex-shrink-0" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Liability, Indemnity & Legal Jurisdiction</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">The company shall not be held liable for:</h3>
              <div className="space-y-2 ml-4">
                <p className="text-sm md:text-base text-gray-700">○ Loss, theft, or damage to personal belongings or valuables.</p>
                <p className="text-sm md:text-base text-gray-700">○ Any injury, loss, or damage arising from adventure activities (such as scuba diving, snorkeling, equipment rentals, etc.) or any mode of transport (cab, ferry, boat, ship, or flight).</p>
                <p className="text-sm md:text-base text-gray-700">○ Cancellations or unfulfilled services due to government restrictions, pandemics, or other force majeure events.</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm md:text-base text-gray-700">• Guests will be held financially responsible for any damage caused to hotel property, ferries, or vehicles during the tour.</p>
              <p className="text-sm md:text-base text-gray-700">• All applicable refunds, if any, will be processed within 7 to 14 business days.</p>
              <p className="text-sm md:text-base text-gray-700">• All claims, disputes, and legal matters related to bookings shall fall under the exclusive jurisdiction of the Courts in Andaman & Nicobar Islands.</p>
              <p className="text-sm md:text-base text-gray-700">• All disputes shall be resolved through arbitration conducted in Sri Vijaya Puram (Port Blair), in accordance with the rules of the Indian Council of Arbitration (ICA).</p>
              <p className="text-sm md:text-base text-gray-700">• By proceeding with the booking, guests agree to resolve all legal matters exclusively within the jurisdiction of the Andaman & Nicobar Islands and waive the right to initiate proceedings in any other jurisdiction.</p>
              <p className="text-sm md:text-base text-gray-700">• Publishing defamatory or false content about the company on public platforms may result in legal action.</p>
            </div>
          </div>
        </div>



      </div>
    </div>
    {/* <Footer /> */}
  </>
  );
};

export default TermsAndConditionsPage;