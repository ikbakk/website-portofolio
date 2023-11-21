import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import prefetch from "@astrojs/prefetch";
const sanityConfig = {
  projectId: "ife8w0nb",
  dataset: "production",
  useCdn: false,
  studioBasePath: "/studio"
};


// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["cdn.sanity.io"]
  },
  output: "server",
  integrations: [sanity(sanityConfig), react(), tailwind(), prefetch()],
  adapter: vercel(),
  prefetch: true
});