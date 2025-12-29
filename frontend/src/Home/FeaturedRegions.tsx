"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import useRegionStore from "../../store/regionStore";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(
  /\/$/,
  ""
);

const buildAssetUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${API_BASE_URL}${u.startsWith("/") ? u : `/${u}`}`;
};

const getVal = (obj: any, key: string) => obj?.[key] ?? obj?.attributes?.[key];

const pickMediaUrl = (media: any) => {
  if (!media) return "";
  const m = media?.data?.attributes ?? media;
  const f = m?.formats;
  return f?.large?.url || f?.medium?.url || f?.small?.url || f?.thumbnail?.url || m?.url || "";
};

const FALLBACK = [
  {
    slug: "everest",
    name: "Everest Region",
    overview: "High-altitude classics, Sherpa culture, and bucket-list Himalayan views.",
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-3e5c7b2b2d7a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "annapurna",
    name: "Annapurna Region",
    overview: "Varied landscapes, teahouse trails, and some of Nepal’s best trek variety.",
    imageUrl:
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "kathmandu-valley",
    name: "Kathmandu Valley",
    overview: "Heritage sites, temples, and local life — perfect for culture-focused tours.",
    imageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function FeaturedRegions({ limit = 6 }: { limit?: number }) {
  const { regions, fetchRegions, loading, error } = useRegionStore();

  useEffect(() => {
    fetchRegions?.();
  }, [fetchRegions]);

  const items = useMemo(() => {
    const raw = Array.isArray(regions) ? regions : [];
    const normalized = raw
      .map((r: any) => {
        const slug = String(getVal(r, "slug") || "").trim();
        const name = String(getVal(r, "name") || "").trim();
        const overview = getVal(r, "overview");
        const heroImage = getVal(r, "heroImage");
        const img = buildAssetUrl(pickMediaUrl(heroImage));

        return {
          id: getVal(r, "id") ?? r?.id,
          slug,
          name,
          overview: typeof overview === "string" ? overview : "",
          imageUrl: img,
        };
      })
      .filter((r: any) => r.slug && r.name);

    return normalized.slice(0, limit);
  }, [regions, limit]);

  const display = items.length > 0 ? items : FALLBACK.slice(0, limit);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Regions</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Browse destination-first — then pick a trek or tour inside each region.
            </p>
          </div>

          <Link
            href="/regions"
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Browse all regions
          </Link>
        </div>

        {error && (
          <div className="mt-6 text-sm text-red-600">
            Couldn’t load regions from API. Showing sample cards for now.
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((r: any) => (
            <Link
              key={r.slug}
              href={`/regions/${r.slug}`}
              className="group bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-52 bg-gray-100">
                <Image
                  src={r.imageUrl || "https://placehold.co/1200x800"}
                  alt={r.name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{r.name}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {r.overview || "Explore this region and discover the best trips we offer."}
                </p>
                <div className="mt-4 text-sm font-semibold text-blue-600">Explore →</div>
              </div>
            </Link>
          ))}
        </div>

        {loading && display.length === 0 && (
          <div className="mt-10 text-gray-600">Loading regions…</div>
        )}
      </div>
    </section>
  );
}
