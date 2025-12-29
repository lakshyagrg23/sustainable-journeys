"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const year = new Date().getFullYear();

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
const address = process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "Kathmandu, Nepal";
const hours = process.env.NEXT_PUBLIC_BUSINESS_HOURS || "Mon–Sat • 9:00 AM – 6:00 PM (NPT)";

const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "";
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "";

export default function Footer() {
  const telHref = phone ? `tel:${phone.replace(/\s/g, "")}` : "";
  const mailHref = email ? `mailto:${email}` : "";

  return (
    <footer className="bg-[#0a2540] text-white/85">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-4">
              <Image
                src="/Logo/SJ-Logo.jpeg"
                alt="Sustainable Journeys Nepal"
                width={64}
                height={64}
                className="rounded-xl bg-white p-2"
              />
              <div>
                <div className="text-xl font-bold text-white">Sustainable Journeys</div>
                <div className="text-sm text-white/70">Nepal • Treks & Tours</div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Responsible travel experiences across Nepal — guided by local expertise,
              safety-first planning, and respect for the mountains and communities.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-white/70" />
                <span className="text-white/75">{address}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaEnvelope className="text-white/70" />
                {email ? (
                  <a className="hover:text-white" href={mailHref}>
                    {email}
                  </a>
                ) : (
                  <span className="text-white/75">Email: (set NEXT_PUBLIC_CONTACT_EMAIL)</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-white/70" />
                {phone ? (
                  <a className="hover:text-white" href={telHref}>
                    {phone}
                  </a>
                ) : (
                  <span className="text-white/75">Phone: (set NEXT_PUBLIC_CONTACT_PHONE)</span>
                )}
              </div>

              <div className="text-white/70 text-xs">{hours}</div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              {facebookUrl ? (
                <a
                  aria-label="Facebook"
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <FaFacebookF />
                </a>
              ) : null}

              {instagramUrl ? (
                <a
                  aria-label="Instagram"
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <FaInstagram />
                </a>
              ) : null}

              {whatsappUrl ? (
                <a
                  aria-label="WhatsApp"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <FaWhatsapp />
                </a>
              ) : null}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li><Link className="hover:text-white" href="/treks">Treks</Link></li>
              <li><Link className="hover:text-white" href="/tours">Tours</Link></li>
              <li><Link className="hover:text-white" href="/regions">Regions</Link></li>
              <li><Link className="hover:text-white" href="/packages">All Trips</Link></li>
              <li><Link className="hover:text-white" href="/blog">Travel Guide</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li><Link className="hover:text-white" href="/about">About</Link></li>
              <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-white" href="/termsAndConditions">Terms</Link></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-3">Trip Planning</h3>
            <p className="text-sm text-white/75">
              Want a custom itinerary? Tell us your dates and preferences.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-white text-black font-semibold px-4 py-2 hover:bg-white/90 transition"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {year} Sustainable Journeys Nepal. All rights reserved.</div>
          <div className="text-white/50">Built with care • Responsible travel</div>
        </div>
      </div>
    </footer>
  );
}
