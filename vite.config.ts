import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import { visualizer } from "rollup-plugin-visualizer";
import { macaronVitePlugin } from "@macaron-css/vite";
import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";
// import suture from "./src/modules/suture/vite";

export default defineConfig({
  plugins: [
    macaronVitePlugin(),
    devtools({
      autoname: true,
      locator: {
        targetIDE: "vscode",
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    // suture(),
    solid({
      adapter: vercel(),
    }),
    visualizer({ brotliSize: true, template: "treemap" }) as any,
  ],
});
