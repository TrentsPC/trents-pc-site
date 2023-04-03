import { createEffect, createSignal } from "solid-js";
import { useFontFile } from "./signals";

export function FontTables() {
  const [fontFile, setFontFile] = useFontFile();
  const [fontBuffer, setFontBuffer] = createSignal<ArrayBuffer>();
  const dataView = () => new DataView(fontBuffer() || new ArrayBuffer(1), 0, 2);
  createEffect(async () => {
    let file = fontFile();
    if (file) {
      let buffer = await file.arrayBuffer();
      setFontBuffer(buffer);
    }
  });
  return (
    <div>
      give me a font file
      <input
        type="file"
        onChange={(e) => {
          let file = e.currentTarget.files?.[0];
          if (file) {
            setFontFile(() => file);
          }
        }}
      />
      {fontBuffer() && fontBuffer()!.byteLength}
    </div>
  );
}
