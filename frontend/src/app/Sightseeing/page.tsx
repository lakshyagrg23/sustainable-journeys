'use cleint'
import React from 'react'
import Navbar from '@/components/Navbar'

export default function SightseeingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-white text-neutral-900">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden min-h-[52vh] sm:min-h-[58vh] lg:min-h-[64vh] flex items-center justify-center">
          <div className="absolute inset-0 -z-20 bg-[url('https://travelogyindia.b-cdn.net/storage/app/article/581/andaman-and-nicobar-travel-guide-thumb.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/35 to-black/50" />
          <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 0, transparent 40%), radial-gradient(circle at 80% 70%, white 0, transparent 40%)" }} />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center text-white">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80">Andaman Island</p>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight">Sightseeing That Feels Like Paradise</h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg max-w-2xl mx-auto text-white/90">
              Beaches, blue waters, historic forts, aur lush forests. Plan your perfect Andaman sightseeing — fast, clean, and mobile friendly.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-semibold">Introduction</h2>
          <p className="mt-4 text-base sm:text-lg leading-7 text-neutral-700">
            Sightseeing is all about exploring the beauty, culture, and history of your travel destination. From iconic monuments to hidden gems, sightseeing lets you discover the true spirit of a place.
          </p>
        </section>

        {/* Why Sightseeing is Important */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h2 className="text-2xl sm:text-3xl font-semibold">Why Sightseeing is Important</h2>
          {/* On mobile: 2 columns to reduce scrolling */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm min-h-[120px] sm:min-h-[140px]">
              <div className="text-3xl">🎎</div>
              <h3 className="mt-2 text-sm sm:text-base font-semibold">Culture samajhne ka best way</h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600">Local traditions, rituals, aur heritage ko near se dekho.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm min-h-[120px] sm:min-h-[140px]">
              <div className="text-3xl">🧭</div>
              <h3 className="mt-2 text-sm sm:text-base font-semibold">Local lifestyle & history explore karna</h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600">Galiyon se museums tak, shehar ka asli rang dekho.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm min-h-[120px] sm:min-h-[140px]">
              <div className="text-3xl">🌟</div>
              <h3 className="mt-2 text-sm sm:text-base font-semibold">Memorable experiences create karna</h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600">Har jagah ek kahani, har pal ek yaad.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm min-h-[120px] sm:min-h-[140px]">
              <div className="text-3xl">📸</div>
              <h3 className="mt-2 text-sm sm:text-base font-semibold">Perfect for photography & memories</h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600">Picture-perfect spots jo feed ko chamka dein.</p>
            </div>
          </div>
        </section>
        {/* Categories section removed as requested to keep focus on main content */}

        {/* Engagement Section */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-semibold">Explore More</h2>
            <p className="text-sm text-neutral-600">Clean, responsive UI — hero section included. 👇</p>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGAGEMENT_ITEMS.map((item) => (
              <EngagementCard key={item.title} title={item.title} subtitle={item.subtitle} gradient={item.gradient} emoji={item.emoji} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

// Removed CategoryCard per requirement

// Dummy data separated for future backend integration
const ENGAGEMENT_ITEMS: { title: string, subtitle: string, gradient: string, emoji: string }[] = [
  {
    title: 'Top 10 Must-Visit Places in Jaipur',
    subtitle: 'Pink City highlights',
    gradient: 'from-rose-500 via-pink-500 to-amber-400',
    emoji: '🕌'
  },
  {
    title: 'Beachside Sightseeing in Goa',
    subtitle: 'Sun, sand, soul',
    gradient: 'from-sky-500 via-cyan-500 to-emerald-400',
    emoji: '🏖️'
  },
  {
    title: 'Explore the Himalayan Wonders',
    subtitle: 'Peaks and peace',
    gradient: 'from-indigo-600 via-blue-600 to-teal-500',
    emoji: '🏔️'
  }
]

function EngagementCard({ title, subtitle, gradient, emoji }: { title: string, subtitle: string, gradient: string, emoji: string }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
      <div className={`relative aspect-[16/9] w-full bg-gradient-to-br ${gradient}`}>
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-900 shadow-sm">Featured</div>
        <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(120px 120px at 20% 30%, white 0, transparent 60%), radial-gradient(160px 160px at 80% 70%, white 0, transparent 60%)" }} />
        <div className="absolute right-4 bottom-3 text-5xl drop-shadow">{emoji}</div>
      </div>
      <div className="p-5">
        <h3 className="text-base sm:text-lg font-semibold leading-snug">{title}</h3>
        <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
        <div className="mt-4">
          <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition group-hover:bg-neutral-800">
            Explore
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </article>
  )
}