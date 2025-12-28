'use client';
import React, { useState, useMemo } from 'react';

interface FaqItem {
  icon: string;
  question: string;
  answer: React.ReactNode;
  keywords: string;
}

const faqData: FaqItem[] = [
  {
    icon: '📶',
    question: 'Can I get mobile network & internet in Andaman?',
    keywords: 'mobile network internet connectivity 4g wifi port blair havelock neil',
    answer: (
      <div>
        <p>Yes — but connectivity varies by island. <strong>Port Blair</strong> has the most reliable 4G coverage.</p>
        <p><strong>Havelock</strong> and <strong>Neil</strong> have decent mobile service but speeds can be slower and connections may be patchy on remote stretches.</p>
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2 my-3">
          Saarthi Andaman works with properties to provide Wi‑Fi where possible; don’t rely on mobile data for critical needs on remote islands.
        </div>
        <p className="text-sm">Tip: Keep an offline copy of important documents and download maps or guides before travelling to remote islands.</p>
      </div>
    )
  },
  {
    icon: '✈️',
    question: 'How do I reach Andaman?',
    keywords: 'reach how to reach andaman flights ships port blair ixz ferry',
    answer: (
      <div>
        <p>The easiest way is by <strong>flight</strong> to Port Blair’s Veer Savarkar International Airport (<strong>IXZ</strong>) from major Indian cities such as Chennai, Kolkata, Delhi, Bangalore and Hyderabad.</p>
        <p>Passenger ships / ferries are also available on routes from Chennai, Kolkata and Visakhapatnam for those who prefer sea travel.</p>
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2 my-3">
          Travel tip: Flights are faster and more frequent; book early during peak season to secure seats and better fares.
        </div>
      </div>
    )
  },
  {
    icon: '🌤️',
    question: 'What is the best time to visit Andaman Islands?',
    keywords: 'time visit season weather climate best when',
    answer: (
      <div>
        <p>The <span className="text-blue-600 font-semibold">best time to visit Andaman</span> is from <strong>October to March</strong> (pleasant & ideal for activities).</p>
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2 my-3">
          <strong>Peak Season:</strong> Dec - Feb (perfect weather, higher prices & crowds)
        </div>
        <p className="font-semibold mt-2">Weather breakdown:</p>
        <ul className="space-y-1 mt-1 text-sm">
          <li><strong>Oct - Mar:</strong> 20-30°C, dry & best for water sports</li>
          <li><strong>Apr - Jun:</strong> 24-37°C, humid, good diving, hot mid-day</li>
          <li><strong>Jul - Sep:</strong> Monsoon, rough seas, many activities shut</li>
        </ul>
      </div>
    )
  },
  {
    icon: '📋',
    question: 'Do I need a passport to visit Andaman Islands?',
    keywords: 'passport requirements documents visa indian citizens foreigners',
    answer: (
      <div>
        <p><strong>Indian Citizens:</strong> No passport needed. Carry valid photo ID (Aadhaar / Voter ID / DL).</p>
        <p><strong>Foreign Nationals:</strong> Passport + Indian Visa + <span className="text-blue-600 font-semibold">Restricted Area Permit (RAP)</span>.</p>
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2 my-3">
          <strong>Tip:</strong> RAP issued on arrival at Port Blair (valid 30 days).
        </div>
        <p className="font-semibold mt-2">Documents:</p>
        <ul className="space-y-1 mt-1 text-sm">
          <li>Photo ID proof</li>
          <li>Return flight tickets</li>
          <li>Hotel booking confirmation</li>
        </ul>
      </div>
    )
  },
  {
    icon: '🛡️',
    question: 'Is Andaman safe for tourists and solo travelers?',
    keywords: 'safety secure safe travel alone family women solo',
    answer: (
      <div>
        <p>Yes, Andaman is <span className="text-blue-600 font-semibold">very safe</span>, including for solo & women travelers.</p>
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2 my-3">
          <strong>Highlights:</strong> Low crime, friendly locals, patrolled tourist zones.
        </div>
        <p className="font-semibold mt-2">Tips:</p>
        <ul className="space-y-1 mt-1 text-sm">
          <li>Follow water safety rules</li>
          <li>Respect restricted tribal areas</li>
          <li>Use licensed operators</li>
          <li>Share itinerary if solo</li>
        </ul>
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-md px-3 py-2 mt-3">
          <strong>Important:</strong> Avoid isolated beaches late at night.
        </div>
      </div>
    )
  },
  {
    icon: '📅',
    question: 'What is the ideal duration for an Andaman trip?',
    keywords: 'duration days stay how long itinerary trip plan',
    answer: (
      <div>
        <p><span className="text-blue-600 font-semibold">5–7 days</span> is ideal for a balanced trip.</p>
        <ul className="space-y-1 mt-2 text-sm">
          <li><strong>3–4 Days:</strong> Port Blair + Havelock (basic)</li>
          <li><strong>5–6 Days:</strong> + Neil Island (recommended)</li>
          <li><strong>7–10 Days:</strong> Add Baratang / Ross / extra activities</li>
          <li><strong>10+ Days:</strong> Relaxed multi-island exploration</li>
        </ul>
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2 mt-3">
          <strong>Value Pick:</strong> 5–6 day plan covers all highlights comfortably.
        </div>
      </div>
    )
  },
  {
    icon: '🏝️',
    question: 'Which are the top islands to visit in Andaman?',
    keywords: 'islands visit top best must-see havelock neil ross north bay',
    answer: (
      <div>
        <p className="font-semibold">Must visit:</p>
        <ul className="space-y-1 mt-1 text-sm">
          <li><strong>Havelock:</strong> Radhanagar Beach & diving</li>
          <li><strong>Neil Island:</strong> Peaceful & scenic rock formations</li>
          <li><strong>Port Blair:</strong> Cellular Jail & museums</li>
        </ul>
        <p className="font-semibold mt-3">Also consider:</p>
        <ul className="space-y-1 mt-1 text-sm">
          <li><strong>Ross Island:</strong> Ruins & wildlife</li>
          <li><strong>North Bay:</strong> Water sports & corals</li>
          <li><strong>Baratang:</strong> Limestone caves & mud volcano</li>
        </ul>
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-3 py-2 mt-3">
          <strong>Balanced Plan:</strong> Port Blair (2) + Havelock (2–3) + Neil (1–2)
        </div>
      </div>
    )
  }
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