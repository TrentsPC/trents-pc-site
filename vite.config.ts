import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import { visualizer } from "rollup-plugin-visualizer";
import { macaronVitePlugin } from "@macaron-css/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    macaronVitePlugin(),
    visualizer({ brotliSize: true, template: "treemap" }),
    solid({
      adapter: vercel(),
    }),
  ],
});
