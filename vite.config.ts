import solid from "solid-start/vite";
import { macaronVitePlugin } from "@macaron-css/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [macaronVitePlugin(), solid()],
});
