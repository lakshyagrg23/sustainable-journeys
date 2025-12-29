"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
const office = process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "Kathmandu, Nepal";
const hours = process.env.NEXT_PUBLIC_BUSINESS_HOURS || "Mon–Sat • 9:00 AM – 6:00 PM (NPT)";
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "";

function cleanPhone(p: string) {
  return p.replace(/\s/g, "");
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tripType: "Trek",
    tripStyle: "Budget-friendly + Practical",
    region: "",
    startDate: "",
    endDate: "",
    groupSize: "2",
    budget: "",
    message: "",
  });

  const telHref = useMemo(() => (phone ? `tel:${cleanPhone(phone)}` : ""), []);
  const mailHref = useMemo(() => (email ? `mailto:${email}` : ""), []);
  const canWhatsApp = Boolean(whatsappUrl);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const buildInquiryText = () => {
    const lines = [
      `Inquiry — Sustainable Journeys Nepal`,
      ``,
      `Name: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Trip Type: ${form.tripType || "-"}`,
      `Trip Style: ${form.tripStyle || "-"}`,
      `Region: ${form.region || "-"}`,
      `Dates: ${form.startDate || "-"} to ${form.endDate || "-"}`,
      `Group Size: ${form.groupSize || "-"}`,
      `Budget (optional): ${form.budget || "-"}`,
      ``,
      `Message:`,
      `${form.message || "-"}`,
    ];
    return lines.join("\n");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!form.name.trim()) return alert("Please enter your name.");
    if (!form.email.trim()) return alert("Please enter your email.");
    if (!form.message.trim()) return alert("Please enter a short message (what you want to do).");

    const text = buildInquiryText();

    if (canWhatsApp) {
      // supports both "wa.me/..." and "https://api.whatsapp.com/..."
      const url = whatsappUrl.includes("?")
        ? `${whatsappUrl}&text=${encodeURIComponent(text)}`
        : `${whatsappUrl}?text=${encodeURIComponent(text)}`;

      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    alert(
      "Inquiry drafted. Add NEXT_PUBLIC_WHATSAPP_URL in .env.local to send via WhatsApp, or copy your message and email it."
    );
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[48vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=2400&q=80"
          alt="Contact Sustainable Journeys Nepal"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-10 w-full">
            <div className="max-w-3xl">
              <p className="text-white/85 text-sm mb-2">Contact • Inquiry • Custom Plans</p>
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
                Tell us your dates — we’ll suggest the right trek or tour.
              </h1>
              <p className="text-white/85 mt-3 text-base md:text-lg">
                Choose your style: <span className="font-semibold">Adventure + Premium</span> or{" "}
                <span className="font-semibold">Budget-friendly + Practical</span>. Same safety-first planning,
                different comfort and budget choices.
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact quick info + inquiry cards */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Quick contact
            </h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              For the fastest response, send an inquiry with your dates and preferred style. We’ll reply with
              the best route options and a clear plan.
            </p>

            <div className="mt-6 rounded-2xl border bg-gray-50 p-6 space-y-3 text-sm">
              <div className="text-gray-700">
                <span className="font-semibold">Office:</span> {office}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Hours:</span> {hours}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {phone ? (
                  <a
                    href={telHref}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Call
                  </a>
                ) : (
                  <div className="px-4 py-2 rounded-xl border text-gray-600">
                    Set NEXT_PUBLIC_CONTACT_PHONE
                  </div>
                )}

                {email ? (
                  <a
                    href={mailHref}
                    className="px-4 py-2 rounded-xl border font-semibold text-gray-900 hover:bg-white"
                  >
                    Email
                  </a>
                ) : (
                  <div className="px-4 py-2 rounded-xl border text-gray-600">
                    Set NEXT_PUBLIC_CONTACT_EMAIL
                  </div>
                )}

                {canWhatsApp ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border font-semibold text-gray-900 hover:bg-white"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <div className="px-4 py-2 rounded-xl border text-gray-600">
                    Set NEXT_PUBLIC_WHATSAPP_URL
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-10">What kind of trip?</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Trek planning",
                  desc: "Altitude, difficulty, pace, acclimatization, gear guidance.",
                  tag: "Best for Himalayas",
                },
                {
                  title: "Tour planning",
                  desc: "Culture, heritage, wildlife, comfortable travel days.",
                  tag: "Relaxed pace",
                },
                {
                  title: "Premium adventure",
                  desc: "Comfort upgrades, smoother logistics, private planning.",
                  tag: "✨ Premium",
                },
                {
                  title: "Budget-smart plan",
                  desc: "Best value routes, transparent costs, practical stays.",
                  tag: "✅ Practical",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border bg-white p-5 shadow-sm">
                  <div className="text-xs text-gray-500">{c.tag}</div>
                  <div className="font-bold text-gray-900 mt-1">{c.title}</div>
                  <div className="text-sm text-gray-600 mt-2">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 border-b bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">Send an inquiry</h2>
                <p className="text-gray-600 mt-2">
                  Share your dates, group size, and style — we’ll suggest the best options.
                </p>
              </div>

              <form onSubmit={onSubmit} className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-900">Name *</label>
                    <input
                      value={form.name}
                      onChange={update("name")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Email *</label>
                    <input
                      value={form.email}
                      onChange={update("email")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                      placeholder="you@example.com"
                      type="email"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Phone</label>
                    <input
                      value={form.phone}
                      onChange={update("phone")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                      placeholder="+977..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Trip Type</label>
                    <select
                      value={form.tripType}
                      onChange={update("tripType")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                    >
                      <option>Trek</option>
                      <option>Tour</option>
                      <option>Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Trip Style</label>
                    <select
                      value={form.tripStyle}
                      onChange={update("tripStyle")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                    >
                      <option>Budget-friendly + Practical</option>
                      <option>Adventure + Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Region (optional)</label>
                    <input
                      value={form.region}
                      onChange={update("region")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                      placeholder="Everest / Annapurna / Langtang..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Start date</label>
                    <input
                      value={form.startDate}
                      onChange={update("startDate")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                      type="date"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">End date</label>
                    <input
                      value={form.endDate}
                      onChange={update("endDate")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                      type="date"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Group size</label>
                    <select
                      value={form.groupSize}
                      onChange={update("groupSize")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3-4">3–4</option>
                      <option value="5-8">5–8</option>
                      <option value="9+">9+</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-900">Budget (optional)</label>
                    <input
                      value={form.budget}
                      onChange={update("budget")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                      placeholder="e.g. $800–$1200 per person"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-900">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    className="mt-1 w-full border rounded-xl px-3 py-2 min-h-[120px]"
                    placeholder="Tell us what you want to do (route ideas, comfort level, prior trek experience, etc.)"
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    {canWhatsApp ? "Send on WhatsApp" : "Submit Inquiry"}
                  </button>

                  <Link
                    href="/regions"
                    className="px-6 py-3 rounded-xl border font-semibold text-gray-900 hover:bg-gray-50 text-center"
                  >
                    Browse Regions
                  </Link>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Tip: For premium adventures, mention comfort preferences (private rooms, hotel upgrades, porter support).
                  For budget plans, mention your “must-haves” so we optimize value without sacrificing safety.
                </p>
              </form>
            </div>

            {/* What happens next */}
            <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">What happens next?</h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-xl bg-white border p-4">
                  <div className="text-xs text-gray-500">Step 1</div>
                  <div className="font-semibold text-gray-900 mt-1">We review your request</div>
                  <div className="text-gray-600 mt-1">Dates, region options, fitness & comfort level.</div>
                </div>
                <div className="rounded-xl bg-white border p-4">
                  <div className="text-xs text-gray-500">Step 2</div>
                  <div className="font-semibold text-gray-900 mt-1">We suggest the best routes</div>
                  <div className="text-gray-600 mt-1">Clear options + realistic day plans.</div>
                </div>
                <div className="rounded-xl bg-white border p-4">
                  <div className="text-xs text-gray-500">Step 3</div>
                  <div className="font-semibold text-gray-900 mt-1">Confirm & finalize</div>
                  <div className="text-gray-600 mt-1">Inclusions/exclusions, stays, and logistics.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl border bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-12">
            <h2 className="text-2xl md:text-4xl font-bold">Want to decide faster?</h2>
            <p className="text-white/85 mt-2 max-w-2xl">
              Explore sample routes first — then send an inquiry with dates and style.
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
