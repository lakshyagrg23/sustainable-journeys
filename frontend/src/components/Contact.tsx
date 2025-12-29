"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
const office = process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "Kathmandu, Nepal";
const hours = process.env.NEXT_PUBLIC_BUSINESS_HOURS || "Mon–Sat • 9:00 AM – 6:00 PM (NPT)";
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "";

function cleanPhone(p: string) {
  return p.replace(/\s/g, "");
}

export default function ContactSection() {
  const telHref = useMemo(() => (phone ? `tel:${cleanPhone(phone)}` : ""), []);
  const mailHref = useMemo(() => (email ? `mailto:${email}` : ""), []);
  const canWhatsApp = Boolean(whatsappUrl);

  const [form, setForm] = useState({
    name: "",
    email: "",
    tripType: "Trek",
    tripStyle: "Budget-friendly + Practical",
    message: "",
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Please enter your name.");
    if (!form.email.trim()) return alert("Please enter your email.");
    if (!form.message.trim()) return alert("Please enter a short message.");

    const text = [
      "Inquiry — Sustainable Journeys Nepal",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Trip Type: ${form.tripType}`,
      `Style: ${form.tripStyle}`,
      "",
      `Message:`,
      form.message,
    ].join("\n");

    if (canWhatsApp) {
      const url = whatsappUrl.includes("?")
        ? `${whatsappUrl}&text=${encodeURIComponent(text)}`
        : `${whatsappUrl}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    alert("Add NEXT_PUBLIC_WHATSAPP_URL in .env.local to enable WhatsApp sending.");
  };

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
              Contact & Inquiry
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-3">
              Let’s plan your Nepal journey.
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Share your dates and travel style — we’ll recommend the best trek/tour options with
              a clear plan. You can choose <span className="font-semibold">Adventure + Premium</span> or{" "}
              <span className="font-semibold">Budget-friendly + Practical</span>.
            </p>

            <div className="mt-6 rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="relative h-44">
                <Image
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=80"
                  alt="Nepal travel"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-xs text-white/85">{office}</div>
                  <div className="text-lg font-bold">We reply with route options</div>
                </div>
              </div>

              <div className="p-6 space-y-3 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">Office:</span> {office}
                </div>
                <div>
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
                      className="px-4 py-2 rounded-xl border font-semibold text-gray-900 hover:bg-gray-50"
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
                      className="px-4 py-2 rounded-xl border font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <div className="px-4 py-2 rounded-xl border text-gray-600">
                      Set NEXT_PUBLIC_WHATSAPP_URL
                    </div>
                  )}
                </div>

                <div className="pt-2 text-xs text-gray-500">
                  Prefer not to message? Use the full inquiry page with more fields.
                </div>

                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center justify-center w-full rounded-xl bg-gray-900 text-white font-semibold px-4 py-2 hover:bg-black"
                >
                  Open full contact page
                </Link>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 border-b bg-white">
                <h3 className="text-2xl font-bold text-gray-900">Quick inquiry</h3>
                <p className="text-gray-600 mt-2">
                  A short message is enough. We’ll respond with route suggestions and next steps.
                </p>
              </div>

              <form onSubmit={onSend} className="p-6 md:p-8">
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
                    <label className="text-sm font-semibold text-gray-900">Trip type</label>
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
                    <label className="text-sm font-semibold text-gray-900">Style</label>
                    <select
                      value={form.tripStyle}
                      onChange={update("tripStyle")}
                      className="mt-1 w-full border rounded-xl px-3 py-2"
                    >
                      <option>Budget-friendly + Practical</option>
                      <option>Adventure + Premium</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-900">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    className="mt-1 w-full border rounded-xl px-3 py-2 min-h-[120px]"
                    placeholder="Dates, region idea, comfort level, group size, and any must-haves..."
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    {canWhatsApp ? "Send on WhatsApp" : "Submit"}
                  </button>

                  <Link
                    href="/regions"
                    className="px-6 py-3 rounded-xl border font-semibold text-gray-900 hover:bg-gray-50 text-center"
                  >
                    Browse Regions
                  </Link>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Tip: For premium adventures, mention comfort preferences (private rooms, upgrades, porter support).
                  For budget plans, mention your “must-haves” so we optimize value safely.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
