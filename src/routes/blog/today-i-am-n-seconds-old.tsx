import { createSignal, onCleanup } from "solid-js";
import { css } from "vite-plugin-inline-css-modules";
import { FontTables, HexViewer } from "~/modules/font-explorer";

const BDAY_MILLIS = 1038913200000;

export default function Page() {
  const [millisOld, setMillisOld] = createSignal(Date.now() - BDAY_MILLIS);
  const secondsOld = () => Math.floor(millisOld() / 1000);

  let t = setInterval(() => setMillisOld(Date.now() - BDAY_MILLIS), 16);
  onCleanup(() => clearInterval(t));
  return (
    <div class={s.root}>
      <div class={s.titleBox}>
        <h1>Today I am {secondsOld()} seconds old</h1>
      </div>
      <h2>Hex viewer</h2>
      <HexViewer />
      {/* <h2>Font tables</h2> */}
      {/* <FontTables /> */}
    </div>
  );
}

const s = css`
  .root {
    max-width: 600px;
    margin: auto;
  }
  .titleBox {
    background-color: var(--color-brand);
    color: white;
    text-align: center;
    padding: 16px;
    margin: 24px 0;
    border-radius: 12px;
    font-family: "Atkinson Hyperlegible";
    font-weight: 700;
    font-size: 2rem;
    font-feature-settings: tnum;
  }
`;
