import { createEffect, createSignal } from "solid-js";
import { useFontFile } from "./signals";

const ROW_COUNT = 32;
const BYTES_PER_ROW = 16;

export function HexViewer() {
  const [fontFile, setFontFile] = useFontFile();
  const [fontBuffer, setFontBuffer] = createSignal<ArrayBuffer>();
  const dataView = () => {
    if (fontBuffer())
      return new DataView(fontBuffer()!, 0, ROW_COUNT * BYTES_PER_ROW);
    return new DataView(
      new ArrayBuffer(ROW_COUNT * BYTES_PER_ROW),
      0,
      ROW_COUNT * BYTES_PER_ROW
    );
  };
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
      <div>
        <p style="font-family:monospace">{fontBuffer()?.byteLength} bytes</p>
        <table style="font-family:monospace">
          <tbody>
            {range(0, ROW_COUNT).map((row) => (
              <tr>
                {range(0, BYTES_PER_ROW).map((offsetFromRow) => (
                  <td style={{ width: "32px" }}>
                    {dataView()
                      .getUint8(row * BYTES_PER_ROW + offsetFromRow)
                      .toString(16)
                      .padStart(2, "0")}
                  </td>
                ))}
                <td style={{ width: "32px" }} />
                <td>
                  {range(0, BYTES_PER_ROW).map((n) =>
                    String.fromCharCode(
                      dataView().getUint8(row * BYTES_PER_ROW + n) || 46
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const range = (start: number, end?: number, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
