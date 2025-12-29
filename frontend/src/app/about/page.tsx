import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[52vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544735716-3e5c7b2b2d7a?auto=format&fit=crop&w=2400&q=80"
          alt="Sustainable Journeys Nepal"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-10 w-full">
            <div className="max-w-3xl">
              <p className="text-white/85 text-sm mb-2">Sustainable Journeys • Nepal</p>
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
                Travel Nepal with purpose — and with a plan that fits your style.
              </h1>
              <p className="text-white/85 mt-3 text-base md:text-lg">
                We build treks and tours around local expertise, safety-first planning, and responsible
                travel — whether you want a premium adventure or a budget-smart itinerary.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
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
                  Plan with Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Principles */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              What we stand for
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Nepal is breathtaking — but it rewards good planning. Our goal is simple: help travelers
              experience Nepal in a way that’s safe, respectful, and genuinely memorable.
              We keep itineraries practical (clear pacing, transparent inclusions, realistic budgets),
              and we never “over-promise” timelines in the mountains.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border bg-gray-50 p-5">
                <div className="text-sm text-gray-500">Safety-first</div>
                <div className="font-semibold text-gray-900 mt-1">Smart pacing & acclimatization</div>
                <p className="text-gray-600 text-sm mt-2">
                  Realistic walking times, buffer days where needed, and clarity on altitude and difficulty.
                </p>
              </div>
              <div className="rounded-2xl border bg-gray-50 p-5">
                <div className="text-sm text-gray-500">Local expertise</div>
                <div className="font-semibold text-gray-900 mt-1">Guides & on-ground support</div>
                <p className="text-gray-600 text-sm mt-2">
                  We work with local partners for better decisions on routes, weather, stays, and logistics.
                </p>
              </div>
              <div className="rounded-2xl border bg-gray-50 p-5">
                <div className="text-sm text-gray-500">Responsible travel</div>
                <div className="font-semibold text-gray-900 mt-1">Respect communities & nature</div>
                <p className="text-gray-600 text-sm mt-2">
                  Thoughtful stays, local services, and simple practices that reduce impact on trails.
                </p>
              </div>
              <div className="rounded-2xl border bg-gray-50 p-5">
                <div className="text-sm text-gray-500">Transparency</div>
                <div className="font-semibold text-gray-900 mt-1">Clear inclusions & expectations</div>
                <p className="text-gray-600 text-sm mt-2">
                  What’s included, what’s not, and what your day actually looks like — no surprises.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border overflow-hidden bg-white shadow-sm">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1800&q=80"
                  alt="Annapurna"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">How we plan trips</h3>
                <ul className="mt-3 space-y-2 text-gray-600 text-sm">
                  <li>• Choose region & style (premium vs budget-smart)</li>
                  <li>• Match route to fitness, time, and season</li>
                  <li>• Confirm stays/transport/inclusions transparently</li>
                  <li>• Share a simple day-by-day plan you can trust</li>
                </ul>

                <div className="mt-5 flex gap-3">
                  <Link
                    href="/regions"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Browse Regions
                  </Link>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-xl border font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
              <div className="text-sm text-white/80">Practical promise</div>
              <div className="text-lg font-bold mt-1">No copy-paste itineraries.</div>
              <p className="text-white/85 text-sm mt-2 leading-relaxed">
                If you have 7 days, we’ll suggest a 7-day plan that makes sense — not a rushed “10-day” trek
                squeezed into a week. Mountains reward honest pacing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two styles */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Two ways to travel with us
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Same safety standards and planning quality — different comfort and budget choices.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Get a quote
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Premium */}
            <div className="rounded-2xl border bg-white overflow-hidden shadow-sm">
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1800&q=80"
                  alt="Premium Adventure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs">
                    ✨ Adventure + Premium
                  </div>
                  <div className="text-white text-xl font-bold mt-2">Premium Adventures</div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">
                  For travelers who want maximum comfort and seamless logistics — better stays where
                  possible, smoother transfers, more support, and options like private planning.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="font-semibold text-gray-900">Comfort upgrades</div>
                    <div className="text-gray-600 mt-1">Better hotels, curated stays, private rooms (where possible).</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="font-semibold text-gray-900">More support</div>
                    <div className="text-gray-600 mt-1">Porter options, better logistics, extra help with planning.</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="font-semibold text-gray-900">Time buffers</div>
                    <div className="text-gray-600 mt-1">More flexibility for weather and recovery days.</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="font-semibold text-gray-900">Private planning</div>
                    <div className="text-gray-600 mt-1">Personalized pacing and add-ons (culture, wildlife, etc.).</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="rounded-2xl border bg-white overflow-hidden shadow-sm">
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=80"
                  alt="Budget Friendly"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs">
                    ✅ Budget-friendly + Practical
                  </div>
                  <div className="text-white text-xl font-bold mt-2">Budget-smart Journeys</div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">
                  For travelers who want value and clarity — smart routes, honest inclusions, and
                  practical stays. You still get safety-first planning and a clean itinerary.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="font-semibold text-gray-900">Best value routes</div>
                    <div className="text-gray-600 mt-1">High-impact experiences without unnecessary add-ons.</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="font-semibold text-gray-900">Clear costs</div>
                    <div className="text-gray-600 mt-1">Transparent inclusions/exclusions and optional upgrades.</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="font-semibold text-gray-900">Practical stays</div>
                    <div className="text-gray-600 mt-1">Teahouses/standard hotels as per route & budget.</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="font-semibold text-gray-900">Simple planning</div>
                    <div className="text-gray-600 mt-1">Straight answers and a plan you can follow easily.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl border bg-white p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Want a recommendation?</h3>
              <p className="text-gray-600 mt-1">
                Tell us your dates + comfort level + fitness — we’ll suggest the right trek/tour and style.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Plan my trip
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl border bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-12">
            <h2 className="text-2xl md:text-4xl font-bold">Ready when you are.</h2>
            <p className="text-white/85 mt-2 max-w-2xl">
              Explore treks, tours, and regions — or send an inquiry and we’ll help you choose.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/treks"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
              >
                Explore Treks
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/15"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
