import { styled } from "@macaron-css/solid";
import { keyframes, style } from "@macaron-css/core";
import { Suspense, createSignal, lazy } from "solid-js";
import { isServer } from "solid-js/web";
import { Title } from "solid-start";
import { Cross1Icon, HeartIcon } from "~/icons/radix";
import { theme } from "~/theme";
import Balancer from "~/modules/wrap-balancer";
import "~/modules/zork";
import { hcl } from "~/modules/color";
import { hue } from "~/signals";
import "~/modules/sokoban";
import { Dialog } from "~/modules/radix";
import { Recaptcha } from "~/components/Recaptcha";
const ChatWidget = lazy(() => import("~/components/ChatWidget"));

function TPCIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24">
      <path fill="black" d="M 12 0 L 24 12 L 12 24 L 0 12 Z" />
    </svg>
  );
}

const [now, setNow] = createSignal<Date | undefined>(undefined);

function updateDate() {
  setNow(new Date());
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

      <section
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
      </section>
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
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
          })}
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
