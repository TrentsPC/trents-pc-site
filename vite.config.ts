import solid from "solid-start/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { macaronVitePlugin } from "@macaron-css/vite";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import { prismjsPlugin } from "vite-plugin-prismjs";
import inlineCss from "vite-plugin-inline-css-modules";
import cloudflare from "solid-start-cloudflare-workers";
// import suture from "./src/modules/suture/vite";

export default defineConfig({
  plugins: [
    inlineCss(),
    prismjsPlugin({
      languages: [
        "markup",
        "css",
        "javascript",
        "js-extras",
        "typescript",
        "jsx",
        "tsx",
      ],
    }),
    macaronVitePlugin(),
    // devtools({
    //   autoname: true,
    //   locator: {
    //     targetIDE: "vscode",
    //     componentLocation: true,
    //     jsxLocation: true,
    //   },
    // }),
    // suture(),
    solid({
      adapter: cloudflare({}),
    }),
    WindiCSS(),
    visualizer({ brotliSize: true, template: "treemap" }) as any,
  ],
});
