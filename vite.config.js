import { resolve } from "path";
// eslint-disable-next-line import/namespace
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        details: resolve(__dirname, "src/detail-pages/index.html")
      },
    },
  },
});
