"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import qs from "qs";
import Navbar from "@/components/Navbar";
import useRegionStore from "../../../../store/regionStore";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

const buildAssetUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${API_BASE_URL}${u.startsWith("/") ? u : `/${u}`}`;
};

export default function RegionDetailPage() {
  const params = useParams();
  const slug = String((params as any)?.slug || "");

  const { singleRegion, fetchRegionBySlug, loading, error } = useRegionStore();
  const [trips, setTrips] = useState<any[]>([]);
  const [tripsLoading, setTripsLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchRegionBySlug(slug);
  }, [slug, fetchRegionBySlug]);

  useEffect(() => {
    const run = async () => {
      if (!slug) return;
      setTripsLoading(true);
      try {
        const query = qs.stringify(
          {
            filters: { region: { slug: { $eq: slug } } },
            populate: { images: true },
            sort: ["createdAt:desc"],
          },
          { encodeValuesOnly: true }
        );
        const res = await fetch(`${API_BASE_URL}/api/packages?${query}`);
        const data = await res.json();
        setTrips(data?.data || []);
      } finally {
        setTripsLoading(false);
      }
    };
    run();
  }, [slug]);

  const heroImg = useMemo(() => {
    const hero =
      singleRegion?.heroImage?.formats?.large?.url ||
      singleRegion?.heroImage?.formats?.medium?.url ||
      singleRegion?.heroImage?.url ||
      "";
    return buildAssetUrl(hero);
  }, [singleRegion]);

  return (
    <>
      <Navbar />

      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image
          src={heroImg || "https://images.unsplash.com/photo-1544735716-3e5c7b2b2d7a?auto=format&fit=crop&w=2400&q=80"}
          alt={singleRegion?.name || "Region"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-6 text-white w-full">
            <h1 className="text-3xl md:text-5xl font-bold">{singleRegion?.name || "Region"}</h1>
            <p className="mt-2 text-white/90 max-w-3xl">
              {singleRegion?.overview || ""}
            </p>
          </div>
        </div>
      </div>

      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {(loading || tripsLoading) && <div>Loading…</div>}
          {error && <div className="text-red-600">{String(error)}</div>}

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trips in this region</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((p: any) => {
              const img =
                p.images?.formats?.medium?.url ||
                p.images?.formats?.small?.url ||
                p.images?.url ||
                "";
              const cover = buildAssetUrl(img) || "/api/placeholder/800/800";

              return (
                <div key={p.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                  <div className="relative aspect-square bg-gray-100">
                    <Image src={cover} alt={p.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{p.tripType || "Trip"}</div>
                    <h3 className="font-bold text-lg">{p.title}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="font-semibold">{p.price ? `₹${Number(p.price).toLocaleString("en-IN")}` : "—"}</div>
                      <Link
                        href={`/trips/${p.slug || p.id}`}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!tripsLoading && trips.length === 0 && (
            <div className="text-gray-600 mt-6">
              No trips found for this region yet. Add more Packages and assign the Region field.
            </div>
          )}
        </div>
      </section>

    </>
  );
}
