import { Accessor, createEffect } from "solid-js";

export type CreateAudioResult = Accessor<HTMLAudioElement | undefined>;

export function createAudio(src: Accessor<string | undefined>) {
  let audio: HTMLAudioElement | undefined;

  createEffect(() => {
    if (audio) {
      audio.pause();
    }
    let newSrc = src();
    if (newSrc) {
      audio = new Audio(newSrc);
    }
  });

  return () => audio;
}
