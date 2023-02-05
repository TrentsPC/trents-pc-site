import { Accessor, createSignal, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { Chart } from "./types";
import { createAudio } from "./createAudio";
import { GIRLS } from "./charts";
import { isServer } from "solid-js/web";

export type RacerStatus = "playing" | "idle";

export type BeatRacerOptions = {
  column: Accessor<number>;
  gridSize: Accessor<number>;
};

export type BeatRacer = {
  status: Accessor<RacerStatus>;
  currentTime: Accessor<number>;
  currentBeat: Accessor<number>;
  chart: Accessor<Chart>;
  notes: Array<{
    transformX: Accessor<number>;
    transformY: Accessor<number>;
    caught: Accessor<boolean | undefined>;
  }>;

  play: (seconds?: number) => void;
  stop: () => void;
};
const MINUTE_IN_MILLIS = 1000 * 60;

const SLOP_BEATS = 0.125;
const GLOBAL_OFFSET = -50;

export function createBeatRacer({
  column,
  gridSize,
}: BeatRacerOptions): BeatRacer {
  const [status, setStatus] = createSignal<RacerStatus>("idle");
  const [chart, setChart] = createStore(GIRLS);
  const [startTime, setStartTime] = createSignal<number | undefined>();
  const [currentTime, setCurrentTime] = createSignal(0);

  let audio = createAudio(() => chart.music);

  const currentBeat = () => {
    if (status() !== "playing") {
      return 0;
    }
    return (
      chart.bpm *
      ((currentTime() - (chart.offset || 0) - GLOBAL_OFFSET) / MINUTE_IN_MILLIS)
    );
  };

  const notes: BeatRacer["notes"] = chart.notes.map((note) => ({
    transformX: () => (note.column - 1 + (note.shift || 0)) * gridSize(),
    transformY: () => (note.beat - currentBeat()) * 64,
    caught: () => note.caught,
  }));

  onMount(() => {
    setStartTime(Date.now());
  });

  onFrame(() => {
    if (status() === "playing") {
      setCurrentTime(Date.now() - (startTime() || 0));

      chart.notes.forEach((note, i) => {
        if (
          note.column === column() &&
          note.beat <= currentBeat() &&
          note.beat >= currentBeat() - SLOP_BEATS
        ) {
          setChart("notes", i, { caught: true });
        }
      });
    }
  });

  function play(seconds?: number) {
    let audioEl = audio();
    if (audioEl) {
      audioEl.ontimeupdate = (e) => {
        setStartTime(Date.now() - (audioEl?.currentTime || 0) * 1000);
      };

      audioEl.currentTime = seconds || 0;
      audioEl.play();
      setStatus("playing");
    }
  }
  function stop() {
    let audioEl = audio();
    if (audioEl) {
      audioEl.pause();
      setStatus("idle");
    }
  }

  return {
    status,
    chart: () => chart,
    notes,
    currentTime,
    currentBeat,
    play,
    stop,
  };
}

function onFrame(fn: () => void) {
  let running = true;

  function frame() {
    if (!running) return;
    fn();

    !isServer && requestAnimationFrame(frame);
  }
  frame();

  onCleanup(() => {
    running = false;
  });
}
