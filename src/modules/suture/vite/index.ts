import { transformAsync, TransformOptions } from "@babel/core";
import ts from "@babel/preset-typescript";
import jsx from "@babel/plugin-syntax-jsx";
import { Plugin, ResolvedConfig } from "vite";
import { sutureBabelPlugin } from "../babel";
import { VitePluginSvelteCache } from "./utils/vite-plugin-svelte-cache";
import { IdParser } from "./utils/id";
import { CompileData, compileSvelte } from "./utils/compile";

export default function suture() {
  let projectRoot = process.cwd();
  const fileMatch = /\.(tsx|jsx)$/;

  let cssModules: Record<string, string> = {};
  const virtualModuleSuffix = ".suture.module.css";
  return <Plugin>{
    name: "suture",
    enforce: "pre",

    buildStart() {
      cssModules = {};
    },
    resolveId(id) {
      if (!id.endsWith(virtualModuleSuffix)) return undefined;
      return "\0" + id;
    },
    load(id) {
      if (!id.startsWith(`\0`) || !id.endsWith(virtualModuleSuffix))
        return undefined;

      const file = id.replace(/\?used$/, "");
      return `.box {
        background-color: red;
      }`;
    },

    async transform(src, _id) {
      const [id] = _id.split("?");
      // if (id.startsWith("\0")) return;
      // console.log(id);
      if (!fileMatch.test(id)) return;
      if (/node_modules/.test(id)) return;

      const shouldBeProcessedWithTypescript = /\.(tsx|ts)$/.test(id);

      const babelOptions: TransformOptions = {
        babelrc: false,
        configFile: false,
        root: projectRoot,
        filename: id,
        sourceFileName: id,
        presets: [[ts]],
        plugins: [jsx, sutureBabelPlugin],
        sourceMaps: true,
        // Vite handles sourcemap flattening
        inputSourceMap: false as any,
      };

      // if (shouldBeProcessedWithTypescript) {
      //   babelOptions.presets!.push([ts]);
      // }

      const res = await transformAsync(src, babelOptions);

      return { code: res?.code };
    },
  };
}

export function svelte(): Plugin {
  const cache = new VitePluginSvelteCache();
  // updated in configResolved hook
  let requestParser: IdParser;
  /* eslint-enable no-unused-vars */

  const plugin: Plugin = {
    name: "vite-plugin-suture",
    // make sure our resolver runs before vite internal resolver to resolve svelte field correctly
    enforce: "pre",

    async load(id, opts) {
      const ssr = !!opts?.ssr;
      const svelteRequest = requestParser(id, !!ssr);
      if (svelteRequest) {
        const { filename, query } = svelteRequest;

        if (query.type === "style") {
          const css = cache.getCSS(svelteRequest);
          if (css) {
            console.log(`load returns css for ${filename}`);
            return css;
          }
        }
      }
    },

    async resolveId(importee, importer, opts) {
      const ssr = !!opts?.ssr;
      const svelteRequest = requestParser(importee, ssr);
      if (svelteRequest?.query.svelte) {
        if (svelteRequest.query.type === "style" && !svelteRequest.raw) {
          // return cssId with root prefix so postcss pipeline of vite finds the directory correctly
          // see https://github.com/sveltejs/vite-plugin-svelte/issues/14
          console.log(
            `resolveId resolved virtual css module ${svelteRequest.cssId}`
          );
          return svelteRequest.cssId;
        }
      }
    },

    async transform(code, id, opts) {
      const ssr = !!opts?.ssr;
      const svelteRequest = requestParser(id, ssr);
      if (
        !svelteRequest ||
        svelteRequest.query.type === "style" ||
        svelteRequest.raw
      ) {
        return;
      }
      let compileData: CompileData;
      try {
        compileData = await compileSvelte(svelteRequest, code);
      } catch (e) {
        throw new Error(e as any);
      }
      cache.update(compileData);
      console.log(
        `transform returns compiled js for ${svelteRequest.filename}`
      );
      return {
        ...compileData.compiled.js,
      };
    },
  };

  return plugin;
}
