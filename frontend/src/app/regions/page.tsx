"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import useRegionStore from "../../../store/regionStore";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

const buildAssetUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${API_BASE_URL}${u.startsWith("/") ? u : `/${u}`}`;
};

export default function RegionsPage() {
  const { regions, fetchRegions, loading, error } = useRegionStore();

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  const list = useMemo(() => (Array.isArray(regions) ? regions : []), [regions]);

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold">Regions of Nepal</h1>
          <p className="mt-2 text-white/90 max-w-2xl">
            Browse trips by region — Everest, Annapurna, Langtang, Kathmandu Valley, and more.
          </p>
        </div>
      </div>

      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading && <div>Loading…</div>}
          {error && <div className="text-red-600">{String(error)}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((r: any) => {
              const hero =
                r.heroImage?.formats?.medium?.url ||
                r.heroImage?.formats?.small?.url ||
                r.heroImage?.url ||
                "";
              const img = buildAssetUrl(hero) || "/api/placeholder/800/800";

              return (
                <Link
                  key={r.id}
                  href={`/regions/${r.slug}`}
                  className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image src={img} alt={r.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">{r.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {r.overview || "Explore this region and discover the best trips we offer."}
                    </p>
                    <div className="mt-3 text-sm text-blue-600 font-semibold">Explore →</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {!loading && list.length === 0 && (
            <div className="text-center text-gray-600 py-10">
              No regions found. (Check: Region entries are published + Public permissions enabled.)
            </div>
          )}
        </div>
      </section>

    </>
  );
}
