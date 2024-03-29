import { styled } from "@macaron-css/solid";
import { keyframes, style } from "@macaron-css/core";
import { Suspense, createSignal, lazy } from "solid-js";
import { isServer } from "solid-js/web";
import { Title } from "solid-start";
import { theme } from "~/theme";
import Balancer from "~/modules/wrap-balancer";
import "~/modules/zork";
// import { hue } from "~/signals";
import "~/modules/sokoban";
import { Dialog } from "~/modules/radix";
import { Recaptcha } from "~/components/Recaptcha";
import { HistoryRacer } from "~/components/HistoryRacer";

import "~/modules/markov";
import { clicker } from "~/modules/clicker";
import { InspectGame } from "~/modules/inspect-game";
import { Cross1Icon, HeartIcon } from "solid-radix-icons";
import { TPCCypher } from "~/icons";
import { IBM_EPOCH } from "~/constants";

function createIBMInfo() {
  let now = Date.now();
  let millisSince = now - IBM_EPOCH;
  let seconds = Math.floor(millisSince / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  return {
    seconds,
    minutes,
    hours,
    days,
    weeks,
  };
}

const ChatWidget = lazy(() => import("~/components/ChatWidget"));

const [now, setNow] = createSignal<Date | undefined>(undefined);
const [ibmInfo, setIBMInfo] = createSignal<ReturnType<typeof createIBMInfo>>(
  createIBMInfo()
);

const [cookieClicks, setCookieClicks] = createSignal(0);
const [hasClicked, setHasClicked] = createSignal(false);

function updateDate() {
  setNow(new Date());
  setIBMInfo(createIBMInfo());
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
      <InspectGame />
      <HistoryRacer />
      <SignUpDialog />
      <main
        class={style({
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: 0,
        })}
      >
        <h1
          class={style({
            userSelect: "none",
            pointerEvents: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            paddingTop: 39,
            paddingLeft: 39,
            fontSize: 64,
            color: "black",
          })}
        >
          trent
        </h1>
        <div
          class={style({
            position: "relative",
            width: 300,
            height: 300,
            borderRadius: "50%",
            overflow: "hidden",
            transition: `all 500ms cubic-bezier(.3, .7, .4, 1)`,
            selectors: {
              "&:hover": {
                width: 300 * 1.2,
                height: 300 * 1.2,
                transition: `all 250ms cubic-bezier(.3, .7, .4, 1.25)`,
              },
              "&:active": {
                width: 300 * 0.9,
                height: 300 * 0.9,
                transition: `all 34ms cubic-bezier(.3, .7, .4, 1)`,
              },
            },
          })}
          onMouseDown={() => {
            setHasClicked(true);
            clicker.click();
          }}
        >
          <svg
            style={{ position: "absolute" }}
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
          >
            <path
              fill={"var(--color-brand)"}
              d="M 12 0 L 24 12 L 12 24 L 0 12 Z"
            />
          </svg>
          {hasClicked() && (
            <div
              class={style({
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontVariantNumeric: "tabular-nums",
                fontSize: "48px",
                fontWeight: 900,
                lineHeight: 1,
                pointerEvents: "none",
                display: "flex",
                alignItems: "start",
              })}
            >
              <span>{clicker.store.pixels}</span>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="white" d="M 12 0 L 24 12 L 12 24 L 0 12 Z" />
              </svg>
            </div>
          )}
        </div>
        <h1
          class={style({
            userSelect: "none",
            pointerEvents: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            paddingTop: 39,
            paddingLeft: 39,
            fontSize: 64,
            clipPath: "polygon(0 0, 150px 0, 0 150px)",
            color: "white",

            transition: `clip-path 500ms cubic-bezier(.3, .7, .4, 1)`,
            selectors: {
              ":hover + &": {
                clipPath: `polygon(0 0, ${150 * 1.2}px 0, 0 ${150 * 1.2}px)`,
                transition: `clip-path 250ms cubic-bezier(.3, .7, .4, 1.25)`,
              },
              ":active + &": {
                clipPath: `polygon(0 0, ${150 * 0.9}px 0, 0 ${150 * 0.9}px)`,
                transition: `clip-path 34ms cubic-bezier(.3, .7, .4, 1)`,
              },
            },
          })}
        >
          trent
        </h1>
      </main>

      {/* <section
        class={style({
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: 0,
        })}
      >
        <p
          class={style({
            width: "100%",
            mixBlendMode: "difference",
            fontSize: 24,
            textAlign: "center",
          })}
        >
          <Balancer>
            Trent was released in late 2002 and web development has been getting
            better ever since.
          </Balancer>
        </p>
      </section> */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
        }}
      >
        {ibmInfo().days} days
        <br />
        {ibmInfo().hours % 24} {ibmInfo().hours % 24 === 1 ? "hour" : "hours"}
        <br />
        {ibmInfo().minutes % 60}{" "}
        {ibmInfo().minutes % 60 === 1 ? "minute" : "minutes"}
        <br />
        {ibmInfo().seconds % 60}{" "}
        {ibmInfo().seconds % 60 === 1 ? "second" : "seconds"}
      </div>
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
        <span style={{ display: "inline-block" }}>
          © 2021–{now() ? formatDate(now()!) : ""}
        </span>
        {". "}
        Trespassers will be prosecuted.
      </CopyrightNotice>
      {/* <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
        alt="Fork me on GitHub"
        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
      /> */}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
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

const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

const CopyrightNotice = styled("small", {
  base: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 12,
    textAlign: "center",
    fontVariantNumeric: "tabular-nums",
    animation: `${fadeIn} 300ms 35ms linear both running`,
    ...fontScale[0],
    color: theme.text2,
  },
});

function SignUpDialog() {
  const [open, setOpen] = createSignal(false);
  return (
    <Dialog.Root open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger
        class={style({
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
        })}
      >
        Sign Up
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          class={style({
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "hsla(0deg, 0%, 20%, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            selectors: {
              "&[data-state=open]": {
                animation: `${fadeIn} 300ms`,
              },
              "&[data-state=closed]": {
                animation: `${fadeOut} 300ms`,
              },
            },
          } as any)}
        >
          <Dialog.Content
            class={style({
              minWidth: 280,
              padding: 24,
              borderRadius: 28,
              backgroundColor: "white",
              position: "relative",
            })}
          >
            <Dialog.Close
              class={style({
                width: "48px",
                height: "48px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 0,
                bottom: "100%",
              })}
            >
              <Cross1Icon color="white" />
            </Dialog.Close>
            <Dialog.Title
              class={style({
                fontSize: "24px",
                marginBottom: "16px",
              })}
            >
              Sign up
            </Dialog.Title>
            <Recaptcha />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
