"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import useTravelStore from "../../../store/travelStore";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

type Mode = "all" | "treks" | "tours";

interface ApiImageFormat {
  url: string;
}

interface ApiImage {
  url: string;
  formats?: {
    thumbnail?: ApiImageFormat;
    small?: ApiImageFormat;
    medium?: ApiImageFormat;
    large?: ApiImageFormat;
  };
}

interface RegionRef {
  name?: string;
  slug?: string;
}

interface PackageApiModel {
  id: number;
  documentId?: string;
  title: string;
  short_description?: string;
  duration?: string;
  price?: number;

  // Nepal additions (you created these in Strapi)
  tripType?: string; // Trek / Tour / Luxury / etc
  difficulty?: string; // Easy / Moderate / Challenging
  maxAltitudeM?: number;
  bestSeason?: string[]; // multi-select enum returns array
  region?: RegionRef;

  // existing media
  images?: ApiImage;
}

const buildAssetUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${API_BASE_URL}${u.startsWith("/") ? u : `/${u}`}`;
};

const isTrek = (tripType?: string) => String(tripType || "").toLowerCase() === "trek";

export default function TripsIndex({ mode }: { mode: Mode }) {
  const { packages, fetchPackages, loading, error } = useTravelStore();

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name");

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const normalized = useMemo(() => {
    const list: PackageApiModel[] = Array.isArray(packages) ? packages : (packages?.data || []);
    return list.map((pkg) => {
      const img =
        pkg.images?.formats?.medium?.url ||
        pkg.images?.formats?.small?.url ||
        pkg.images?.url ||
        "";

      return {
        id: pkg.id,
        slug: (pkg as any).slug || String(pkg.id),
        title: pkg.title,
        description:
          pkg.short_description?.trim() ||
          "A curated journey designed for an unforgettable Nepal experience.",
        price: Number(pkg.price || 0),
        duration: pkg.duration || "—",
        tripType: pkg.tripType,
        difficulty: pkg.difficulty,
        maxAltitudeM: pkg.maxAltitudeM,
        bestSeason: Array.isArray(pkg.bestSeason) ? pkg.bestSeason : [],
        regionName: pkg.region?.name || "Nepal",
        regionSlug: pkg.region?.slug || "",
        image: buildAssetUrl(img) || "/api/placeholder/800/800",
      };
    });
  }, [packages]);

  const modeFiltered = useMemo(() => {
    if (mode === "treks") return normalized.filter((t: any) => isTrek(t.tripType));
    if (mode === "tours") return normalized.filter((t: any) => !isTrek(t.tripType));
    return normalized;
  }, [normalized, mode]);

  const regionOptions = useMemo(() => {
    const set = new Set<string>();
    modeFiltered.forEach((t: any) => set.add(t.regionName));
    return ["All", ...Array.from(set).sort()];
  }, [modeFiltered]);

  const difficultyOptions = useMemo(() => {
    const set = new Set<string>();
    modeFiltered.forEach((t: any) => {
      if (t.difficulty) set.add(t.difficulty);
    });
    return ["All", ...Array.from(set).sort()];
  }, [modeFiltered]);

  const filtered = useMemo(() => {
    let list = [...modeFiltered];

    if (regionFilter !== "All") list = list.filter((t: any) => t.regionName === regionFilter);
    if (difficultyFilter !== "All") list = list.filter((t: any) => t.difficulty === difficultyFilter);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((t: any) => t.title.toLowerCase().includes(q));
    }

    switch (sortBy) {
      case "price-low":
        list.sort((a: any, b: any) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a: any, b: any) => b.price - a.price);
        break;
      default:
        list.sort((a: any, b: any) => a.title.localeCompare(b.title));
    }

    return list;
  }, [modeFiltered, regionFilter, difficultyFilter, search, sortBy]);

  const pageTitle =
    mode === "treks" ? "Treks in Nepal" : mode === "tours" ? "Tours in Nepal" : "All Trips in Nepal";
  const pageSubtitle =
    mode === "treks"
      ? "High-altitude adventures, scenic trails, and iconic Himalayan routes."
      : mode === "tours"
      ? "Culture, wildlife, heritage, and comfort-focused journeys."
      : "Explore everything Sustainable Journeys offers across Nepal.";

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Loading…</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-red-600">
          {String(error)}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544735716-3e5c7b2b2d7a?auto=format&fit=crop&w=2400&q=80"
          alt="Nepal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-white text-3xl md:text-5xl font-bold">{pageTitle}</h1>
            <p className="text-white/90 mt-2 max-w-2xl">{pageSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search trips…"
            className="border rounded-lg px-3 py-2"
          />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {regionOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {difficultyOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="name">Name A–Z</option>
            <option value="price-low">Price ↑</option>
            <option value="price-high">Price ↓</option>
          </select>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-4 text-gray-700">
            <span className="font-semibold">{filtered.length}</span> trips found
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t: any) => (
              <div key={t.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="relative aspect-square bg-gray-100">
                  <Image src={t.image} alt={t.title} fill className="object-cover" />
                </div>

                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {t.regionName} {t.tripType ? `• ${t.tripType}` : ""}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{t.title}</h3>

                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <div>Duration: {t.duration}</div>
                    {t.difficulty ? <div>Difficulty: {t.difficulty}</div> : null}
                    {t.maxAltitudeM ? <div>Max altitude: {t.maxAltitudeM} m</div> : null}
                    {t.bestSeason?.length ? (
                      <div>Best season: {t.bestSeason.join(", ")}</div>
                    ) : null}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-semibold text-gray-900">
                      {t.price ? `₹${t.price.toLocaleString("en-IN")}` : "—"}
                    </div>
                    <Link
                      href={`/trips/${t.slug}`}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-600 py-10">
                No trips match your filters yet.
              </div>
            )}
          </div>
        </div>
      </section>

    </>
  );
}
