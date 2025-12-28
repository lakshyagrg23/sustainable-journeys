import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Simple domains array covers most https hosts
    domains: [
      '143.110.245.122',
      "images.unsplash.com",
      "i.pravatar.cc",
      "i.imgur.com",
      "placehold.co",
      "saarthiandaman.com",
      "res.cloudinary.com",
      'andamantourtravel.com',
      'andamanbliss.com',
      'png.pngtree.com',
      'www.spinny.com',
      "www.muthootcap.com",
      'media1.thrillophilia.com',
      'wanderon-images.gumlet.io',
      'www.andamanisland.in',
      'www.andamanislands.com',
      'media.tenor.com',
      'cdn.pixabay.com',
      'cms.journeyempires.com',
      'andamantourism.org.in',
      'www.andamanworldtravels.com',
      'www.go2andaman.com',
      'adventureandaman.com',
      'media0.giphy.com',
      'media.tenor.com',
      'www.andamantourism.org',
      'media2.giphy.com',
      'classroomclipart.com',
      'www.acg.aaa.com',
      'www.gokitetours.com',
      'cdn.pixabay.com',
      'png.pngtree.com',
      'static.vecteezy.com'

    ],
    // For http (e.g. local/remote Strapi) or if you need ports / finer control
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "139.84.142.191",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
