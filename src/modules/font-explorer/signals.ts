import { createMemo, createSignal } from "solid-js";

const [fontFile, setFontFile] = createSignal<File>();

export function useFontFile() {
  return [fontFile, setFontFile] as const;
}
