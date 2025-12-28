"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X, MessageCircle } from "lucide-react";

export default function InquiryModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  // Auto-open modal on home route
  useEffect(() => {
    setTimeout(() =>
      pathname === '/' && setOpen(true),
      4000);
  }, [pathname]);

  // trigger mount animation when `open` changes
  useEffect(() => {
    let t: number | undefined;
    if (open) {
      // slight delay so transitions pick up
      t = window.setTimeout(() => setMounted(true), 10);
    } else {
      setMounted(false);
    }
    return () => { if (t) window.clearTimeout(t); };
  }, [open]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    nights: '',
    message: '',
    adult: 1,
    child: 0,
    infant: 0,
    countryCode: '+91',
  });
  const [loading, setLoading] = useState(false);
  // Remove local error/success state, use toast instead

  // Handlers for increment/decrement
  const handleCount = (field: 'adult' | 'child' | 'infant', delta: number) => {
    setForm(f => ({ ...f, [field]: Math.max(0, f[field] + delta) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // error/success state removed, use toast only
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Please fill all required fields.');
      return;
    }
    setLoading(true);
    const formattedMsg = `Travel Dates: ${form.date || '-'}\nNights: ${form.nights || '-'}\nAdults: ${form.adult}\nChildren: ${form.child}\nInfants: ${form.infant}\nMessage: ${form.message}`;
    try {
      const res = await fetch('/api/zoho-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: `${form.countryCode} ${form.phone}`,
          message: formattedMsg,
          subject: 'Trip Inquiry',
          source: 'floating-inquiry',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to send inquiry.');
      }
      // Check Zoho's response for actual success
      const zohoResult = data?.zoho?.data?.[0];
      if (zohoResult && zohoResult.code === 'SUCCESS') {
        toast.success('Inquiry sent successfully!');
        setForm({ name: '', phone: '', date: '', nights: '', message: '', adult: 1, child: 0, infant: 0, countryCode: '+91' });
      } else {
        const zohoMsg = zohoResult?.message || data?.zoho?.message || 'Failed to send inquiry.';
        throw new Error(zohoMsg);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send inquiry.');
    } finally {
      setLoading(false);
    }
  };

  const closeWithAnimation = () => {
    setMounted(false);
    // wait for exit animation (match duration below) then unmount
    window.setTimeout(() => setOpen(false), 400);
  };

  return (
    <>
      {/* Floating Circular Trigger Button with Enhanced Animations */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Enquire Now"
        className="fixed right-4 md:right-8 top-[30vh] z-50
             bg-gradient-to-r from-orange-400 to-yellow-500
             hover:from-orange-500 hover:to-yellow-600
             text-white font-medium tracking-wide
             px-3 py-1.5 md:px-6 md:py-3 text-sm md:text-base
             rounded-r-xl rounded-l-none shadow-2xl
             transition-all duration-300 ease-out
             hover:shadow-[0_15px_35px_rgba(251,146,60,0.4)]
             hover:scale-105 active:scale-95
             rotate-90 origin-right
             animate-pulse hover:animate-none
             before:absolute before:inset-0 before:rounded-r-xl before:rounded-l-none
             before:bg-gradient-to-r before:from-orange-300 before:to-yellow-400
             before:opacity-0 before:transition-opacity before:duration-300
             hover:before:opacity-20
             after:absolute after:inset-0 after:rounded-r-xl after:rounded-l-none
             after:animate-ping after:bg-orange-400 after:opacity-20 after:scale-110"
      >
        <span className="relative z-10">Enquire Now</span>
      </button>

      {/* Modal Overlay with Enhanced Animation */}
      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center 
                     bg-black/50 backdrop-blur-sm
                     transition-all duration-700 ease-out
                     ${mounted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeWithAnimation}
        >
          {/* Modal Content with Spring Animation */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-[90vw] max-w-xs sm:max-w-sm md:max-w-md 
                       bg-white shadow-2xl rounded-2xl p-4 md:p-6 
                       relative mx-2 md:mx-4
                       transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                       ${mounted
                ? 'opacity-100 translate-y-0 scale-100 rotate-0'
                : 'opacity-0 translate-y-8 scale-90 -rotate-1'
              }
                       before:absolute before:inset-0 before:rounded-2xl
                       before:bg-gradient-to-br before:from-orange-50 before:to-yellow-50
                       before:opacity-50 before:-z-10`}
          >
            {/* Header with Staggered Animation */}
            <div className={`flex justify-between items-center border-b pb-2 mb-4
                           transform transition-all duration-500 delay-100
                           ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <div className="flex items-center gap-2">
                <MessageCircle className={`w-5 h-5 md:w-6 md:h-6 text-orange-500
                                         transform transition-all duration-500 delay-200
                                         ${mounted ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-45 scale-75'}`} />
                <h2 className="text-base md:text-lg font-bold text-gray-800">
                  Enquire for Best Holiday Deals
                </h2>
              </div>
              <button
                onClick={closeWithAnimation}
                className={`transform transition-all duration-300 hover:scale-110 hover:rotate-90
                           ${mounted ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`}
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Form with Staggered Animations */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={`w-full border rounded-md p-2 text-sm md:text-base
                           focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent
                           text-black placeholder-gray-500
                           transform transition-all duration-500 delay-200
                           hover:shadow-md focus:shadow-lg
                           ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                required
              />

              <div className={`flex gap-2 transform transition-all duration-500 delay-300
                              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <select
                  className="border rounded-md p-2 w-16 md:w-20 text-sm md:text-base text-black bg-white
                           focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                  value={form.countryCode}
                  onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
                >
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="flex-1 border rounded-md p-2 text-sm md:text-base text-black placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent
                           transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  required
                />
              </div>

              <div className={`grid grid-cols-3 gap-1 md:gap-2 transform transition-all duration-500 delay-400
                              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex flex-col items-center">
                  <span className="text-xs md:text-sm font-medium text-stone-950 mb-1">Adult</span>
                  <div className="flex items-center border rounded-md bg-white shadow-sm">
                    <button
                      type="button"
                      className="px-1.5 md:px-2 text-black hover:bg-gray-100 transition-colors duration-200 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleCount('adult', -1)}
                      disabled={form.adult <= 1}
                    >-</button>
                    <input type="text" value={form.adult} readOnly className="w-6 md:w-8 text-center text-black text-sm" />
                    <button
                      type="button"
                      className="px-1.5 md:px-2 text-black hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleCount('adult', 1)}
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs md:text-sm font-medium text-stone-950 mb-1 text-center">Child (2-5)</span>
                  <div className="flex items-center border rounded-md bg-white shadow-sm">
                    <button
                      type="button"
                      className="px-1.5 md:px-2 text-black hover:bg-gray-100 transition-colors duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleCount('child', -1)}
                      disabled={form.child <= 0}
                    >-</button>
                    <input type="text" value={form.child} readOnly className="w-6 md:w-8 text-center text-black text-sm" />
                    <button
                      type="button"
                      className="px-1.5 md:px-2 text-black hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleCount('child', 1)}
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs md:text-sm font-medium text-black mb-1 text-center">Infant (0-2)</span>
                  <div className="flex items-center border rounded-md bg-white shadow-sm">
                    <button
                      type="button"
                      className="px-1.5 md:px-2 text-black hover:bg-gray-100 transition-colors duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleCount('infant', -1)}
                      disabled={form.infant <= 0}
                    >-</button>
                    <input type="text" value={form.infant} readOnly className="w-6 md:w-8 text-center text-black text-sm" />
                    <button
                      type="button"
                      className="px-1.5 md:px-2 text-black hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleCount('infant', 1)}
                    >+</button>
                  </div>
                </div>
              </div>

              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className={`w-full border rounded-md p-2 text-sm md:text-base text-black placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent
                           transform transition-all duration-500 delay-500 hover:shadow-md focus:shadow-lg
                           ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                required
              />

              <input
                type="text"
                placeholder="2 Nights & 3 Days"
                value={form.nights}
                onChange={e => setForm(f => ({ ...f, nights: e.target.value }))}
                className={`w-full border rounded-md p-2 text-sm md:text-base text-black placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent
                           transform transition-all duration-500 delay-600 hover:shadow-md focus:shadow-lg
                           ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              />

              <textarea
                placeholder="Write your message here..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={`w-full border rounded-md p-3 h-20 md:h-24 resize-none text-sm md:text-base
                           focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent
                           text-black placeholder-gray-500
                           transform transition-all duration-500 delay-700 hover:shadow-md focus:shadow-lg
                           ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              />



              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-orange-400 to-yellow-500 
                           hover:from-orange-500 hover:to-yellow-600
                           text-white font-semibold py-2 md:py-3 rounded-md text-sm md:text-base
                           transform transition-all duration-500 delay-800
                           hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                           disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                           ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                disabled={loading}
              >
                <span className={`transition-all duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                  {loading ? 'Sending...' : 'Enquire Now'}
                </span>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </button>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 transform transition-all duration-500 delay-900
                              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <button
                  type="button"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold 
                           py-2 rounded-md flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm
                           transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                           hover:shadow-md"
                  onClick={() => window.open('tel:+918944999448', '_self')}
                >
                  <span className="animate-bounce">📞</span> +91-8944999448
                </button>
                <button
                  type="button"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold 
                           py-2 rounded-md flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm
                           transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                           hover:shadow-md"
                  onClick={() => window.open('tel:+919476017072', '_self')}
                >
                  <span className="animate-bounce delay-100">📞</span> +91-9476017072
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover aria-label="inquiry-toast" />
    </>
  );
}
