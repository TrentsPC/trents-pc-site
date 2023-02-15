import { transformAsync, TransformOptions } from "@babel/core";
import ts from "@babel/preset-typescript";
import jsx from "@babel/plugin-syntax-jsx";
import { Plugin } from "vite";
import { sutureBabelPlugin } from "../babel";

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
