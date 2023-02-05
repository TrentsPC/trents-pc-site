import { styled } from "@macaron-css/solid";
import { keyframes, style } from "@macaron-css/core";
import {
  For,
  Index,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { isServer } from "solid-js/web";
import { HeartFilledIcon } from "~/icons/radix";
import { theme } from "~/theme";
import { createBeatRacer } from "~/modules/beat-racer";
import { Presence } from "~/modules/radix/solid/Presence";
import cover from "./gloria-cover.png";

const GAP = 32;
const MARGIN = 6;

export function HistoryRacer() {
  const [x, setX] = createSignal(0);
  const [maxX, setMaxX] = createSignal(0);
  const { status, notes, currentBeat, play, stop, chart } = createBeatRacer({
    column: x,
    gridSize: () => GAP,
  });

  const currentLyric = () =>
    chart().lyrics?.findLast((l) => l.start <= currentBeat());

  function reset() {
    setMaxX(0);
    stop();
  }

  // createEffect(() => {
  //   function handleKeyDown(e: KeyboardEvent) {
  //     if (e.key === "ArrowLeft") {
  //       setX((x) => Math.max(x - 1, 0));
  //     }
  //     if (e.key === "ArrowRight") {
  //       setX((x) => {
  //         setMaxX((maxX) => Math.min(Math.max(maxX, x + 1), 5));
  //         return Math.min(x + 1, 5);
  //       });
  //     }
  //   }
  //   window.addEventListener("keydown", handleKeyDown);
  //   onCleanup(() => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   });
  // });

  createEffect(() => {
    if (x() === maxX() && maxX() < 5) {
      setTimeout(() => {
        history.pushState({ x: x() + 1 }, "");
        history.go(-1);
      }, 250);
    }
    setMaxX(Math.max(x(), maxX()));
  });

  createEffect(() => {
    if (x() === 0 && maxX() !== 0) {
      reset();
    }
  });
  if (!isServer) {
    // window.onpopstate = (event) => {
    //   setX(Number(event.state?.x) || 0);
    // };
  }
  onMount(() => {
    function handlePopState(event: PopStateEvent) {
      setX(Number(event.state?.x) || 0);
    }
    window.addEventListener("popstate", handlePopState);
    onCleanup(() => {
      window.removeEventListener("popstate", handlePopState);
    });
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        "z-index": 1,
      }}
    >
      <Lines maxX={maxX()} />
      <div
        style={{
          position: "absolute",
          left: `${(x() - 1) * GAP + MARGIN}px`,
          width: `${GAP}px`,
          height: `${GAP}px`,
          display: "flex",
          transition: "left 0.1s cubic-bezier(0.2, 0, 0, 1)",
          "justify-content": "center",
          "align-items": "center",
        }}
      >
        <HeartFilledIcon />
      </div>
      <Presence visible={maxX() === 5 && status() === "idle"}>
        <PlayButton
          onClick={() => play(0)}
          visible={maxX() === 5 && status() === "idle"}
        />
      </Presence>
      {maxX() === 5 && (
        <div
          class={style({
            position: "absolute",
            borderTopWidth: 1,
            borderColor: theme.separator,
            width: GAP * 4,
            left: GAP * 0.5 + MARGIN,
            top: 16,
          })}
        />
      )}
      {status() === "playing" && (
        <For each={notes}>
          {(note) => (
            <div
              style={{
                position: "absolute",
                top: `${GAP * -0.5 + 16}px`,
                left: `${MARGIN}px`,
                width: `${GAP}px`,
                height: `${GAP}px`,
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                fill: "var(--color-brand)",
                animation: note.caught()
                  ? `${noteExit} 10ms ease-out running forwards`
                  : undefined,
                transform: `translate(${note.transformX()}px, ${note.transformY()}px)`,
                opacity: note.transformY() > 450 ? 0 : 1,
                transition: "opacity 0.3s linear",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  // fill="var(--color-brand)"
                  d="M 12 0 L 24 12 L 12 24 L 0 12 Z"
                />
              </svg>
            </div>
          )}
        </For>
      )}
      {currentLyric() && (
        <div
          class={style({
            position: "absolute",
            top: 0,
            left: MARGIN * 2 + GAP * 5,
            width: 500,
            height: 32,
            lineHeight: "32px",
          })}
          style={{
            animation:
              currentLyric()!.end && currentLyric()!.end! < currentBeat()
                ? `${lyricExit} 1000ms running forwards`
                : undefined,
          }}
        >
          <Index each={currentLyric()?.words}>
            {(word) => (
              <span
                style={{
                  color:
                    word().start <= currentBeat()
                      ? "var(--color-brand-vibrant)"
                      : theme.text2,
                  "font-weight": word().start <= currentBeat() ? 900 : 400,
                }}
              >
                {word().word}{" "}
              </span>
            )}
          </Index>
        </div>
      )}
    </div>
  );
}

function Lines(props: { maxX: number }) {
  return (
    <>
      <Show when={props.maxX > 0}>
        <Line
          classList={{
            exiting: props.maxX < 1,
          }}
          style={{
            left: `${0.5 * GAP + MARGIN}px`,
          }}
        />
      </Show>
      <Show when={props.maxX > 1}>
        <Line
          classList={{
            exiting: props.maxX <= 1,
          }}
          style={{
            left: `${1.5 * GAP + MARGIN}px`,
          }}
        />
      </Show>
      <Show when={props.maxX > 2}>
        <Line
          classList={{
            exiting: props.maxX <= 2,
          }}
          style={{
            left: `${2.5 * GAP + MARGIN}px`,
          }}
        />
      </Show>
      <Show when={props.maxX > 3}>
        <Line
          classList={{
            exiting: props.maxX <= 3,
          }}
          style={{
            left: `${3.5 * GAP + MARGIN}px`,
          }}
        />
      </Show>
      <Show when={props.maxX > 4}>
        <Line
          classList={{
            exiting: props.maxX <= 4,
          }}
          style={{
            left: `${4.5 * GAP + MARGIN}px`,
          }}
        />
      </Show>
    </>
  );
}

const noteExit = keyframes({
  "0%": {
    opacity: 1,
    fill: "var(--color-brand-vibrant)",
  },
  "100%": {
    opacity: 0,
    fill: "var(--color-brand-vibrant)",
  },
});
const lyricExit = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  },
});

const lineEnter = keyframes({
  "0%": {
    opacity: 0,
    background:
      "linear-gradient(to bottom, var(--color-brand-vibrant), transparent)",
  },
  "50%": {
    opacity: 1,
    background:
      "linear-gradient(to bottom, var(--color-brand-vibrant), transparent)",
  },
  "100%": {
    opacity: 1,
    background: `linear-gradient(to bottom, ${theme.separator}, transparent)`,
  },
});

const Line = styled("div", {
  base: {
    position: "absolute",
    top: 0,
    height: "500px",
    width: `1px`,
    animation: `${lineEnter} 1000ms cubic-bezier(0.2,0,0,1) running forwards`,
    selectors: {
      "&.exiting": {
        // animation: `${exit} 1000ms running forwards`,
      },
    },
  },
});

// PLAY BUTTON CARD

const cardEnter = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(10px)",
  },
  "50%": {
    opacity: 0,
    transform: "translateY(10px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0px)",
  },
});
const cardExit = keyframes({
  "0%": {
    opacity: 1,
    transform: "translateY(0px)",
  },
  "100%": {
    opacity: 0,
    transform: "translateY(10px)",
  },
});

function PlayButton(props: { onClick: () => void; visible: boolean }) {
  return (
    <div
      class={style({
        position: "absolute",
        top: 64,
        left: MARGIN,
        borderRadius: 6,
        width: GAP * 8,
        backgroundColor: "white",
        boxShadow: `0 11px 15px -7px rgb(0 0 0 / 20%), 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%)`,
        display: "flex",
        alignItems: "center",
      })}
      style={{
        animation: props.visible
          ? `${cardEnter} 600ms cubic-bezier(0.4,0,0.2,1) running forwards`
          : `${cardExit} 300ms cubic-bezier(0.4,0,0.2,1) running forwards`,
      }}
    >
      <img
        src={cover}
        width={GAP * 3}
        class={style({
          borderRadius: 6,
        })}
      />
      <div>
        <h2
          class={style({
            fontWeight: 600,
            fontSize: 14,
          })}
        >
          Girls{" "}
          <span
            class={style({
              color: theme.text2,
              fontWeight: 400,
            })}
          >
            - Copyright free
          </span>
        </h2>
        <p
          class={style({
            fontWeight: 400,
            fontSize: 14,
          })}
        >
          Patricia Taxxon
        </p>
        <button
          onClick={props.onClick}
          class={style({
            color: "var(--color-brand-vibrant)",
            fontWeight: 600,
            fontSize: 14,
          })}
        >
          Play
        </button>
      </div>
    </div>
  );
}
