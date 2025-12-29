"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import useTravelStore from "../../store/travelStore";

type Mode = "treks" | "tours" | "all";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(
  /\/$/,
  ""
);

const buildAssetUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${API_BASE_URL}${u.startsWith("/") ? u : `/${u}`}`;
};

// supports both Strapi shapes:
// - v5-ish flat: { title, slug, images: { url, formats } }
// - v4-ish: { attributes: { title, slug, images: { data: { attributes: { url, formats }}}}}
const getVal = (obj: any, key: string) => obj?.[key] ?? obj?.attributes?.[key];

const pickMediaUrl = (media: any) => {
  if (!media) return "";
  const m = media?.data?.attributes ?? media;
  const f = m?.formats;
  return f?.large?.url || f?.medium?.url || f?.small?.url || f?.thumbnail?.url || m?.url || "";
};

const FALLBACK = [
  {
    slug: "everest-base-camp",
    title: "Everest Base Camp Trek",
    short_description: "A classic Himalayan trek with iconic views and strong acclimatization pacing.",
    duration: "12–14 Days",
    tripType: "Trek",
    difficulty: "Challenging",
    maxAltitudeM: 5364,
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-3e5c7b2b2d7a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "annapurna-base-camp",
    title: "Annapurna Base Camp Trek",
    short_description: "A high-reward trek through forests, villages, and dramatic mountain amphitheatres.",
    duration: "7–11 Days",
    tripType: "Trek",
    difficulty: "Moderate",
    maxAltitudeM: 4130,
    imageUrl:
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "kathmandu-valley-tour",
    title: "Kathmandu Valley Heritage Tour",
    short_description: "Temples, courtyards, cuisine, and culture — a relaxed, story-rich experience.",
    duration: "3–5 Days",
    tripType: "Tour",
    difficulty: "Easy",
    maxAltitudeM: 1400,
    imageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function FeaturedTrips({
  mode = "all",
  title,
  subtitle,
  limit = 6,
}: {
  mode?: Mode;
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const { packages, fetchPackages, loading, error } = useTravelStore();

  useEffect(() => {
    fetchPackages?.();
  }, [fetchPackages]);

  const items = useMemo(() => {
    const raw = Array.isArray(packages) ? packages : [];

    const normalized = raw
      .map((r: any) => {
        const slug = String(getVal(r, "slug") || "").trim();
        const title = String(getVal(r, "title") || "").trim();
        const short_description = getVal(r, "short_description");
        const duration = getVal(r, "duration");
        const tripType = getVal(r, "tripType");
        const difficulty = getVal(r, "difficulty");
        const maxAltitudeM = getVal(r, "maxAltitudeM");

        const imgRaw = getVal(r, "images");
        const img = buildAssetUrl(pickMediaUrl(imgRaw));

        return {
          id: getVal(r, "id") ?? r?.id,
          slug,
          title,
          short_description: typeof short_description === "string" ? short_description : "",
          duration: typeof duration === "string" ? duration : "",
          tripType: typeof tripType === "string" ? tripType : "",
          difficulty: typeof difficulty === "string" ? difficulty : "",
          maxAltitudeM: maxAltitudeM ?? "",
          imageUrl: img,
        };
      })
      .filter((t: any) => t.slug && t.title);

    const filtered =
      mode === "treks"
        ? normalized.filter((t: any) => String(t.tripType).toLowerCase() === "trek")
        : mode === "tours"
        ? normalized.filter((t: any) => String(t.tripType).toLowerCase() === "tour")
        : normalized;

    return filtered.slice(0, limit);
  }, [packages, mode, limit]);

  const display =
    items.length > 0
      ? items
      : FALLBACK.filter((t) => {
          const type = String(t.tripType).toLowerCase();
          if (mode === "treks") return type === "trek";
          if (mode === "tours") return type === "tour";
          return true;
        }).slice(0, limit);

  const heading =
    title || (mode === "treks" ? "Featured Treks" : mode === "tours" ? "Featured Tours" : "Featured Trips");

  const sub =
    subtitle ||
    (mode === "treks"
      ? "Popular routes with difficulty, altitude, and duration shown clearly."
      : mode === "tours"
      ? "Culture, wildlife, and comfort-focused journeys curated for Nepal."
      : "Start with these popular picks — we can customize any itinerary.");

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{heading}</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">{sub}</p>
          </div>

          <Link
            href={mode === "treks" ? "/treks" : mode === "tours" ? "/tours" : "/packages"}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            View all
          </Link>
        </div>

        {error && (
          <div className="mt-6 text-sm text-red-600">
            Couldn’t load trips from API. Showing sample cards for now.
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((t: any) => (
            <Link
              key={t.slug}
              href={`/trips/${t.slug}`}
              className="group bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-52 bg-gray-100">
                <Image
                  src={t.imageUrl || "https://placehold.co/1200x800"}
                  alt={t.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/55 text-white">
                    {t.tripType || (mode === "treks" ? "Trek" : "Tour")}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{t.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {t.short_description || "Open this trip to view details, itinerary, and inclusions."}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {t.duration && (
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                      ⏱ {t.duration}
                    </span>
                  )}
                  {t.difficulty && (
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                      🧗 {t.difficulty}
                    </span>
                  )}
                  {t.maxAltitudeM && (
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                      🏔 {t.maxAltitudeM} m
                    </span>
                  )}
                </div>

                <div className="mt-4 text-sm font-semibold text-blue-600">View details →</div>
              </div>
            </Link>
          ))}
        </div>

        {loading && display.length === 0 && (
          <div className="mt-10 text-gray-600">Loading featured trips…</div>
        )}
      </div>
    </section>
  );
}
