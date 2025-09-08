import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://guraril.com",
  integrations: [react()],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
});
