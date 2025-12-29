import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
// import MapButton from "@/components/MapButton";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sustainable Journeys Nepal",
  description: "Treks and tours across Nepal — safety-first, local expertise, responsible travel.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image" href="/Logo/SJ-Logo.jpeg" />
        {/* Google Tag Manager */}
        {gtmId ? (
  <Script id="gtm" strategy="afterInteractive">
    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');`}
  </Script>
) : null}

        {/* Global site tag (gtag.js) - Google Analytics */}
        {gaId ? (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
    <Script id="gtag-init" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');`}
    </Script>
  </>
) : null}
        {/* End Google Analytics */}

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        {gtmId ? (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  </noscript>
) : null}

        {/* End Google Tag Manager (noscript) */}
        {children}
        {/* <MapButton /> */}
        <FloatingButtons />
        <InquiryModal />
        <Footer />
      </body>
    </html>
  );
}
