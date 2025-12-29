"use client";

import Image from "next/image";
import Link from "next/link";

export default function Choice() {
  const cards = [
    {
      title: "Safety-first planning",
      desc: "Realistic pacing, altitude-aware itineraries, and practical guidance so the trip feels smooth, not rushed.",
      icon: "🛡️",
    },
    {
      title: "Local expertise",
      desc: "We plan with people who actually know the routes, seasons, stays, and on-ground logistics in Nepal.",
      icon: "🧭",
    },
    {
      title: "Transparent inclusions",
      desc: "Clear inclusions/exclusions and optional upgrades — no confusing surprises after you commit.",
      icon: "✅",
    },
    {
      title: "Responsible travel",
      desc: "Community-friendly choices and mindful practices that respect trails, culture, and local businesses.",
      icon: "🌿",
    },
    {
      title: "Two travel styles",
      desc: "Adventure + Premium or Budget-friendly + Practical — same safety standards, different comfort/budget choices.",
      icon: "✨",
    },
    {
      title: "Support before & during",
      desc: "Packing guidance, route clarity, and simple planning support so you feel confident throughout.",
      icon: "🤝",
    },
  ];

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left content */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
              Why Sustainable Journeys?
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-3 leading-tight">
              A better way to plan Nepal — practical, safe, and tailored to your style.
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Nepal is incredible — but the best experiences come from honest planning.
              We build itineraries that match your time, fitness, and comfort preferences,
              and we keep everything clear: what’s included, what’s optional, and what your days look like.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Plan my trip
              </Link>
              <Link
                href="/regions"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border font-semibold text-gray-900 hover:bg-gray-50"
              >
                Browse Regions
              </Link>
            </div>

            {/* Two styles */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border bg-gray-50 p-5">
                <div className="text-xs font-semibold text-gray-500">✨ Adventure + Premium</div>
                <div className="text-lg font-bold text-gray-900 mt-1">Premium Adventures</div>
                <p className="text-sm text-gray-600 mt-2">
                  Comfort upgrades, smoother logistics, private planning, and optional extra support.
                </p>
              </div>
              <div className="rounded-2xl border bg-gray-50 p-5">
                <div className="text-xs font-semibold text-gray-500">✅ Budget-friendly + Practical</div>
                <div className="text-lg font-bold text-gray-900 mt-1">Budget-smart Journeys</div>
                <p className="text-sm text-gray-600 mt-2">
                  Best value routes, clear costs, practical stays — without compromising safety.
                </p>
              </div>
            </div>
          </div>

          {/* Right visuals + cards */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border overflow-hidden shadow-sm bg-white">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1800&q=80"
                  alt="Nepal mountain view"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-xs text-white/85">Plan smart • Travel better</div>
                  <div className="text-xl font-bold">Treks & Tours across Nepal</div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.map((c) => (
                  <div key={c.title} className="rounded-2xl border bg-gray-50 p-5">
                    <div className="text-2xl">{c.icon}</div>
                    <div className="font-bold text-gray-900 mt-2">{c.title}</div>
                    <div className="text-sm text-gray-600 mt-2 leading-relaxed">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA strip */}
            <div className="mt-6 rounded-2xl border bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
              <div className="text-sm text-white/80">Quick start</div>
              <div className="text-lg font-bold mt-1">Tell us your dates — we’ll suggest the best options.</div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/treks"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
                >
                  Explore Treks
                </Link>
                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold border border-white/25 hover:bg-white/15"
                >
                  Explore Tours
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold border border-white/25 hover:bg-white/15"
                >
                  Send Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
