import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { For, JSX } from "solid-js";
import { theme } from "~/theme";

export const Description = styled("p", {
  base: {
    fontSize: 22,
    marginTop: "-16px !important",
    lineHeight: "28px",
    color: theme.text2,
  },
});

export function Highlights({ features }: { features: JSX.Element[] }) {
  return (
    <div
      class={style({
        marginTop: 48,
      })}
    >
      <div
        class={style({
          marginBottom: 24,
          marginRight: 24,
        })}
      >
        <h2>Features</h2>
        <ul>
          <For each={features}>
            {(feature) => (
              <li
                class={style({
                  display: "flex",
                  marginTop: 12,
                  fontSize: 14,
                  lineHeight: "20px",
                })}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  class={style({ marginRight: 12, marginTop: 2 })}
                >
                  <path
                    fill="var(--color-brand)"
                    d="M 12 0 L 24 12 L 12 24 L 0 12 Z"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
}

export const HeroContainer = styled("div", {
  base: {
    background:
      "linear-gradient(150deg, var(--color-brand), var(--color-brand2), var(--color-brand3), var(--color-brand4), var(--color-brand5), var(--color-brand6), var(--color-brand7))",
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "100px",
    paddingBottom: "100px",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
