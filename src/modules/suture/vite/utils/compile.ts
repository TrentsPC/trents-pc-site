import { SvelteRequest } from "./id";

export interface Code {
  code: string;
  map?: any;
  dependencies?: any[];
}

export interface Compiled {
  js: Code;
  css: Code;
}

export interface CompileData {
  filename: string;
  normalizedFilename: string;
  lang: string;
  compiled: Compiled;
  ssr: boolean | undefined;
  dependencies: string[];
}

export async function compileSvelte(
  svelteRequest: SvelteRequest,
  code: string
): Promise<CompileData> {
  return {
    filename: svelteRequest.filename,
    normalizedFilename: svelteRequest.normalizedFilename,
    lang: "jsx",
    compiled: {
      js: { code: code },
      css: { code: "" },
    },
    ssr: undefined,
    dependencies: [],
  };
}
