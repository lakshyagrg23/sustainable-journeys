'use client';
import React, { useState, useMemo } from 'react';

interface FaqItem {
  icon: string;
  question: string;
  answer: React.ReactNode;
  keywords: string;
}

const faqData = [
  {
    question: "What’s the best time to visit Nepal for trekking?",
    answer:
      "For most treks, Spring (Mar–May) and Autumn (Sep–Nov) are ideal: stable weather, clear views, and comfortable trail conditions. Winter can be great for lower-altitude routes, while monsoon months are better for certain rain-shadow areas.",
  },
  {
    question: "Do I need permits for treks like Everest/Annapurna?",
    answer:
      "Yes—most trekking regions require permits (like TIMS or region permits, depending on route). We’ll guide you on what’s required based on your selected itinerary and handle the process where possible.",
  },
  {
    question: "How do you handle altitude and safety?",
    answer:
      "We plan acclimatization properly, keep daily altitude gains sensible, and set realistic pacing. We also recommend hydration, rest, and monitoring symptoms. For high-altitude routes, we plan buffer days and provide clear safety guidance.",
  },
  {
    question: "What fitness level is required for treks?",
    answer:
      "Easy routes can be done with basic fitness. Moderate routes need regular walking/cardio preparation. Challenging routes (like EBC) benefit from consistent training and hiking practice. We can suggest a simple training plan based on your trek.",
  },
  {
    question: "What’s included in your trips?",
    answer:
      "Inclusions depend on the trip: guide support, accommodation, transport, permits assistance, and itinerary planning. Each trip page lists inclusions/exclusions clearly. We can also customize to include porters or upgrade stays.",
  },
  {
    question: "Can you customize the itinerary?",
    answer:
      "Yes. You can choose a private trip, add rest days, adjust comfort levels, add cultural experiences, or combine regions (e.g., Kathmandu + Pokhara + Chitwan).",
  },
];


const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      faqData.filter(f =>
        (f.question + ' ' + f.keywords)
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <section className="py-16 md:py-24 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center px-4 py-8 md:py-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Everything you need to know about exploring the Andaman Islands
          </p>
        </div>


        <div className="mt-10 md:mt-12 bg-white/95 backdrop-blur rounded-2xl shadow-xl ring-1 ring-slate-200 p-6 md:p-10">
          <div className="mb-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search for questions..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full rounded-full border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white py-3 pl-12 pr-5 text-sm md:text-base outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filtered.length === 0 && (
              <div className="text-center py-10 text-slate-500 text-sm">
                No results found.
              </div>
            )}
            {filtered.map((item) => {
              const actualIndex = faqData.indexOf(item);
              const active = openIndex === actualIndex;
              return (
                <div
                  key={actualIndex}
                  className={`rounded-xl border transition overflow-hidden ${active
                    ? 'border-blue-400 shadow-md'
                    : 'border-slate-200 hover:shadow-sm'
                    }`}
                >
                  <button
                    onClick={() =>
                      setOpenIndex(active ? null : actualIndex)
                    }
                    className={`w-full flex items-center justify-between text-left px-5 md:px-7 py-4 md:py-5 bg-white transition ${active ? 'bg-blue-50' : 'bg-white'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow">
                        {item.icon}
                      </div>
                      <span className="font-semibold text-slate-800 text-sm md:text-base leading-snug">
                        {item.question}
                      </span>
                    </div>
                    <span
                      className={`ml-4 inline-flex items-center justify-center text-blue-600 font-bold text-xl md:text-2xl transition-transform ${active ? 'rotate-45' : ''
                        }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${active
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="bg-slate-50 px-5 md:px-7 pb-5 md:pb-6 pt-2 text-slate-600 text-xs md:text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;