module.exports = [
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:3000",
        "https://sustainable-journeys-ujl8.vercel.app",
        // add custom domain later too
      ],
      headers: "*",
    },
  },
  "strapi::errors",
  "strapi::security",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
