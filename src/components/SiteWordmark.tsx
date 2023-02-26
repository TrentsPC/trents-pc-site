import { style } from "@macaron-css/core";

export function SiteWordmark(props: { title: string }) {
  return (
    <div
      class={style({
        position: "relative",
        width: 200,
      })}
    >
      <p
        class={style({
          position: "absolute",
          bottom: 0,
          left: 17,
          zIndex: -1,
          fontSize: 22,
          lineHeight: "28px",
        })}
      >
        {props.title}
      </p>
      <TPCIcon />
      <p
        class={style({
          position: "absolute",
          bottom: 0,
          left: 17,
          fontSize: 22,
          lineHeight: "28px",

          color: "white",
          zIndex: 1,
          clipPath: "polygon(0 0, 28px 0, 0 28px)",
        })}
        aria-hidden="true"
      >
        {props.title}
      </p>
    </div>
  );
}
function TPCIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24">
      <path fill="var(--color-brand)" d="M 12 0 L 24 12 L 12 24 L 0 12 Z" />
    </svg>
  );
}
