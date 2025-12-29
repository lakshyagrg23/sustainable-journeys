import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import ContactSection from "@/components/Contact";

import FeaturedTrips from "@/Home/FeaturedTrips";
import FeaturedRegions from "@/Home/FeaturedRegions";
import Choice from "@/Home/Choice";
import Testimonials from "@/Home/Testimonials";
import FAQSection from "@/Home/FAQSection";
import Blogs from "@/Home/Blogs";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src="/mountain/himalayas.jpg"
          alt="Nepal Himalayas"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <p className="text-white/90 text-sm md:text-base mb-3">
                Sustainable Journeys • Nepal
              </p>

              <h1 className="text-white text-3xl md:text-6xl font-bold leading-tight">
                Trek. Travel.{" "}
                <span className="text-white/90">Respect the mountains.</span>
              </h1>

              <p className="text-white/90 mt-4 text-base md:text-lg">
                Curated treks and tours across Nepal — built around local expertise,
                safety-first planning, and responsible travel.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/treks"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
                >
                  Explore Treks
                </Link>
                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/15"
                >
                  Explore Tours
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/15"
                >
                  Get a Custom Plan
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/10 border border-white/20 p-4 text-white">
                  <div className="text-sm text-white/80">Local expertise</div>
                  <div className="font-semibold">Guides & support</div>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/20 p-4 text-white">
                  <div className="text-sm text-white/80">Safety-first</div>
                  <div className="font-semibold">Smart planning</div>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/20 p-4 text-white">
                  <div className="text-sm text-white/80">Sustainable</div>
                  <div className="font-semibold">Travel responsibly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick browse (keep this - it’s good) */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Start browsing</h2>
              <p className="text-gray-600 mt-2">
                Use Regions for destination-led browsing, or Treks/Tours for trip-type browsing.
              </p>
            </div>
            <Link
              href="/regions"
              className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Browse Regions
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/treks"
              className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-44">
                <Image
                  src="https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1600&q=80"
                  alt="Treks"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">Treks</h3>
                <p className="text-gray-600 mt-1">
                  Himalayan routes with difficulty & altitude clearly shown.
                </p>
              </div>
            </Link>

            <Link
              href="/tours"
              className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-44">
                <Image
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80"
                  alt="Tours"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">Tours</h3>
                <p className="text-gray-600 mt-1">
                  Culture, heritage, wildlife, and comfort-focused journeys.
                </p>
              </div>
            </Link>

            <Link
              href="/regions"
              className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-44">
                <Image
                  src="https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1600&q=80"
                  alt="Regions"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">Regions</h3>
                <p className="text-gray-600 mt-1">
                  Everest, Annapurna, Langtang and more — browse destination-first.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* NEW: rich homepage sections */}
      <FeaturedTrips mode="treks" />
      <FeaturedTrips mode="tours" />
      <FeaturedRegions />

      <Choice />
      <Testimonials />
      <FAQSection />
      <Blogs />

      {/* CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl border bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-12">
            <h2 className="text-2xl md:text-4xl font-bold">Not sure what to pick?</h2>
            <p className="text-white/85 mt-2 max-w-2xl">
              Tell us your dates, comfort preference, and experience level — we’ll suggest the
              best trek or tour.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
              >
                Contact & Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
