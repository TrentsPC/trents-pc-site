import { styled } from "@macaron-css/solid";
import { keyframes, style } from "@macaron-css/core";
import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { Title } from "solid-start";
import { HeartIcon, QuestionMarkIcon } from "~/icons/radix";
import { theme } from "~/theme";
import { hcl } from "~/modules/color";

function TPCIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24">
      <path fill="black" d="M 12 0 L 24 12 L 12 24 L 0 12 Z" />
    </svg>
  );
}

const [now, setNow] = createSignal<Date | undefined>(undefined);
const [hue, setHue] = createSignal(0);

function updateDate() {
  setNow(new Date());
  setHue(hue() + 1);
  requestAnimationFrame(() => {
    updateDate();
  });
}
!isServer && updateDate();

function formatDate(date: Date) {
  function pad(val: string | number) {
    return val.toString().padStart(2, "0");
  }

  const hour = ((date.getHours() + 23) % 12) + 1;
  const ampm = date.getHours() < 12 ? "AM" : "PM";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(hour)}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${date
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
}

export default function Home() {
  return (
    <>
      <Title>Trents.Computer</Title>
      <main
        class={style({
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <div
          class={style({
            width: 300,
            height: 300,
            position: "relative",
          })}
        >
          <h1
            class={style({
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              fontSize: 64,
              color: "black",
            })}
          >
            trent
          </h1>
          <svg
            style={{ position: "absolute" }}
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
          >
            <path
              fill={hcl(hue(), 30, 80)}
              d="M 12 0 L 24 12 L 12 24 L 0 12 Z"
            />
          </svg>
          <h1
            class={style({
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              fontSize: 64,
              clipPath: "polygon(0 0, 100% 50%, 50% 100%)",
              color: "white",
            })}
          >
            trent
          </h1>
        </div>
      </main>
      <CopyrightNotice>
        Made with{" "}
        <HeartIcon
          width="15"
          class={style({
            display: "inline-block",
          })}
          preserveAspectRatio="none"
          style={{ transform: "rotate(180deg) translateY(1px)" }}
        />{" "}
        by Trent at{" "}
        <a
          href="mailto:trent@trents.computer"
          class={style({
            ":hover": {
              textDecoration: "underline",
            },
          })}
        >
          trent@trents.computer
        </a>{" "}
        © 2021–
        {now() ? formatDate(now()!) : ""}
      </CopyrightNotice>
    </>
  );
}

const fontScale = {
  0: {
    fontSize: 14,
    lineHeight: "20px",
  },
};

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const CopyrightNotice = styled("small", {
  base: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 12,
    display: "inline-block",
    textAlign: "center",
    fontVariantNumeric: "tabular-nums",
    animation: `${fadeIn} 300ms 35ms linear both running`,
    ...fontScale[0],
    color: theme.text2,
  },
});
