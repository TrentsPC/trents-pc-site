import { Chart, Lyric } from "./types";
import girls from "./songs/Patricia-Taxxon-Girls.mp3";

// function beatsToMillis(beats: number, bpm: number) {
//   let minsPerBeat = 1 / bpm;
//   let millisPerBeat = minsPerBeat * 1000 * 60;
//   return millisPerBeat * beats;
// }

type GetLyrics = (offset: number) => Lyric;

const girlsOwnTheVoid: GetLyrics = (o) => ({
  start: 2 + o,
  end: o + 5,
  words: [
    { start: 2.5 + o, word: "Girls" },
    { start: 3 + o, word: "own" },
    { start: 3.5 + o, word: "the" },
    { start: 3.875 + o, word: "void" },
  ],
});
const letsMakeSomeNoise: GetLyrics = (o) => ({
  start: o + 0.5,
  words: [
    { start: 0.5 + o, word: "Letʼs" },
    { start: 1 + o, word: "make" },
    { start: 1.5 + o, word: "some" },
    { start: 2 + o, word: "noise!" },
  ],
});
const dontLeaveTheHouse: GetLyrics = (o) => ({
  start: o - 1,
  words: [
    { start: -0.5 + o, word: "Donʼt" },
    { start: 0 + o, word: "leave" },
    { start: 0.5 + o, word: "the" },
    { start: 0.875 + o, word: "house" },
  ],
});
const withoutAPartybag: GetLyrics = (o) => ({
  start: o + 1,
  words: [
    { start: 1.25 + o, word: "without" },
    { start: 1.75 + o, word: "a" },
    { start: 2 + o, word: "partybag" },
  ],
});
const checkThis: GetLyrics = (o) => ({
  start: o + 3,
  words: [
    { start: 3 + o, word: "Check" },
    { start: 3.5 + o, word: "this!" },
  ],
});
const imStillAPrincess: GetLyrics = (o) => ({
  start: o,
  words: [
    { start: 0.5 + o, word: "Iʼm" },
    { start: 1 + o, word: "still" },
    { start: 1.5 + o, word: "a" },
    { start: 2 + o, word: "princess" },
  ],
});
const iCanCurtsy: GetLyrics = (o) => ({
  start: o + 2.5,
  words: [
    { start: 3 + o, word: "I" },
    { start: 3.5 + o, word: "can" },
    { start: 4 + o, word: "curtsy" },
  ],
});
const iCanBeatYouAtTetris: GetLyrics = (o) => ({
  start: o + 1,
  words: [
    { start: 1 + o, word: "I" },
    { start: 1.5 + o, word: "can" },
    { start: 2 + o, word: "beat" },
    { start: 2.25 + o, word: "you" },
    { start: 2.5 + o, word: "at" },
    { start: 3 + o, word: "tetris" },
  ],
});
const whenTheresNothingLeftToWear: GetLyrics = (o) => ({
  start: o + 2.5,
  end: o + 8,
  words: [
    { start: 3 + o, word: "When" },
    { start: 3.5 + o, word: "thereʼs" },
    { start: 4 + o, word: "nothing" },
    { start: 4.875 + o, word: "left" },
    { start: 5.5 + o, word: "to" },
    { start: 5.875 + o, word: "wear" },
  ],
});

const outroImStillAPrincess = (o: number) => [
  {
    start: o,
    words: [
      { start: 0.5 + o, word: "Iʼm" },
      { start: 1 + o, word: "still" },
      { start: 1.5 + o, word: "a" },
      { start: 2 + o, word: "princess" },
    ],
  },
  {
    start: o + 2.5,
    words: [
      { start: 3 + o, word: "When" },
      { start: 3.5 + o, word: "thereʼs" },
      { start: 4 + o, word: "nothing" },
      { start: 4.875 + o, word: "left" },
      { start: 5.5 + o, word: "to" },
      { start: 5.875 + o, word: "wear" },
    ],
  },
  {
    start: o + 5.5,
    end: o + 12,
    words: [
      { start: 5 + o, word: "When" },
      { start: 5.5 + o, word: "thereʼs" },
      { start: 6 + o, word: "nothing" },
      { start: 6.875 + o, word: "left" },
      { start: 7.5 + o, word: "to" },
      { start: 7.875 + o, word: "wear" },
    ],
  },
];

const outroOwnTheVoid = (o: number) => [
  {
    start: 3 + o,
    words: [
      { start: 2.5 + o, word: "Girls" },
      { start: 3 + o, word: "own" },
      { start: 3.5 + o, word: "the" },
      { start: 3.875 + o, word: "void" },
    ],
  },
];

function verse(o: number) {
  return [
    girlsOwnTheVoid(o),
    letsMakeSomeNoise(o + 4),
    dontLeaveTheHouse(o + 8),
    withoutAPartybag(o + 8),
    checkThis(o + 8),
    imStillAPrincess(o + 12),
    iCanCurtsy(o + 12),
    iCanBeatYouAtTetris(o + 16),

    letsMakeSomeNoise(o + 20),
    dontLeaveTheHouse(o + 24),
    withoutAPartybag(o + 24),
    checkThis(o + 24),
    imStillAPrincess(o + 28),
    whenTheresNothingLeftToWear(o + 28),
  ];
}

export const GIRLS: Chart = {
  bpm: 99.5,
  offset: 0,
  title: "Girls",
  subtitle: "(Copyright free)",
  artist: "Patricia Taxxon",
  music: girls,
  lyrics: [
    ...verse(4 + 24),
    ...verse(68 + 24),
    ...verse(132 + 24),
    girlsOwnTheVoid(164 + 24),
    girlsOwnTheVoid(164 + 8 + 24),
    girlsOwnTheVoid(164 + 16 + 24),
    girlsOwnTheVoid(164 + 24 + 24),
    ...verse(196 + 24),
    ...verse(228 + 24),
    girlsOwnTheVoid(260 + 24),
    ...outroImStillAPrincess(264 + 24),
    ...outroOwnTheVoid(268 + 24),
    ...outroImStillAPrincess(272 + 24),
    ...outroOwnTheVoid(276 + 24),
    ...outroImStillAPrincess(280 + 24),
    ...outroOwnTheVoid(284 + 24),
    ...outroImStillAPrincess(288 + 24),
  ],

  notes: [
    { beat: 0, column: 5 },
    { beat: 0.5, column: 5 },
    // { beat: 1, column: 5 },
    { beat: 1.5, column: 5 },
    { beat: 2, column: 5 },
    // { beat: 2.5, column: 5 },
    { beat: 3, column: 5 },
    // { beat: 3.5, column: 5 },
    { beat: 4, column: 4 },
    { beat: 4.5, column: 4 },
    // { beat: 5, column: 5 },
    { beat: 5.5, column: 4 },
    { beat: 6, column: 4 },
    // { beat: 6.5, column: 5 },
    { beat: 7, column: 4 },
    // { beat: 7.5, column: 5 },
    { beat: 8, column: 3 },
    { beat: 8.5, column: 3 },
    // { beat: 9, column: 5 },
    { beat: 9.5, column: 3 },
    { beat: 10, column: 3 },
    // { beat: 10.5, column: 5 },
    { beat: 11, column: 3 },
    // { beat: 11.5, column: 5 },
    { beat: 12, column: 2 },
    { beat: 12.5, column: 2 },
    // { beat: 13, column: 5 },
    { beat: 13.5, column: 2 },
    { beat: 14, column: 2 },
    // { beat: 14.5, column: 5 },
    { beat: 15, column: 2 },
    // { beat: 15.5, column: 5 },
  ],
};

// 170

// 194 early
// 232 late
